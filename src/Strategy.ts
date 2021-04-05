import OAuth2Strategy, { InternalOAuthError } from "passport-oauth2";
import util from "util";
import env from "dotenv";

env.config();

class Strategy {
    name: string;
    _scope: string;
    _oauth2: OAuth2Strategy;

    constructor(options, verify) {
        options = options || {};
        options.authorizationURL = "https://discord.com/api/oauth2/authorize";
        options.tokenURL = "https://discord.com/api/oauth2/token";
        options.scopeSeparator = " ";
        OAuth2Strategy.call(this, options, verify);
        this.name = "discord";
        this._oauth2.useAuthorizationHeaderforGET(true);
    }

    userProfile(token, done) {
        this._oauth2.get("https://discord.com/api/users/@me", token, (err, body) => {
            if(err) return done(new InternalOAuthError("Couldn't fetch user profile.", err));
            let parsed;
            try { parsed = JSON.parse(body); } 
            catch { return done(new Error("Couldn't parse user profile.")); }
            parsed.provider = "discord";
            parsed.accessTOKEN = token;
            return done(null, parsed);
        });
    }
}

util.inherits(Strategy, OAuth2Strategy);

export {Strategy};