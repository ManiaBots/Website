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
    callbackURL: 'http://localhost:3002/login',
    scope: ['identify', 'guilds.join', 'connections', 'guilds']
}, (t, r, profile, done) => process.nextTick(_ => done(null, profile))) as any);

app.listen(3002, () => console.log("Online"));

app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.render(`${process.cwd()}/src/views/index.ejs`, { user: req.user, logged: req.user ? true : false }));

app.get("/router", (req, res) => {
    const page = req.query.page as string;
    if(page == "admin" && (!req.user || !["506899274748133376"].includes((req.user as any).id))) 
        return res.render(`${process.cwd()}/src/views/error.ejs`, { msg: "The admin page is restricted to site administration (400)" });
    if(page == "#") return res.send("#");
    if(pages[page]) res.render(`${process.cwd()}/src/views/${pages[page]}`, { user: req.user, logged: req.user ? true : false });
    else res.render(`${process.cwd()}/src/views/error.ejs`, { msg: "That page could not be found! (404)" });
});

app.get("/login", passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => res.redirect("/"));

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get("*", (req, res) => res.redirect("/"));