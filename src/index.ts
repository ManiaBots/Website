import express from "express";
import passport from "passport";
import {Strategy} from "./Strategy";
import session from "express-session";
import pages from "./pages";

const app = express();

app.use(express.static(`${process.cwd()}/dist/`));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(new Strategy({
    clientID: process.env.clientId,
    clientSecret: process.env.clientSecret,
    callbackURL: process.argv.includes("--dev") ? 'http://localhost:3900/login' : "https://beta.maniabots.xyz/login",
    scope: ['identify', 'guilds.join', 'connections', 'guilds']
}, (_t, _r, profile, done) => process.nextTick(() => done(null, profile))) as undefined);

app.listen(3002, () => console.log("Online"));

app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.render(`${process.cwd()}/src/views/main/index.ejs`, { user: req.user, logged: req.user ? true : false }));
app.get("/admin", (req, res) => {
    if(!req.user) return res.redirect("/");
    res.render(`${process.cwd()}/src/views/admin/index.ejs`, { user: req.user, logged: req.user ? true : false });
});

app.get("/router", (req, res) => {
    const page = req.query.page as string;
    if(page.startsWith("admin-")) {
        if(!req.user || !["506899274748133376"].includes((req.user as {id}).id))
            return res.render(`${process.cwd()}/src/views/error.ejs`, { msg: "The admin page is restricted to site administration (400)" });
        if(pages.admin[page.replace("admin-", "")])
            return res.render(`${process.cwd()}/src/views/admin/${pages.admin[page.replace("admin-", "")]}`, { user: req.user, logged: req.user ? true : false });

        res.render(`${process.cwd()}/src/views/error.ejs`, { msg: "That page could not be found! (404)" });    
    } else {
        if(pages.main[page]) 
            return res.render(`${process.cwd()}/src/views/main/${pages.main[page]}`, { user: req.user, logged: req.user ? true : false });

        res.render(`${process.cwd()}/src/views/error.ejs`, { msg: "That page could not be found! (404)" });    
    }
});

app.get("/login", passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => res.redirect("/"));

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get("*", (req, res) => res.redirect("/"));