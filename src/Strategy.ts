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
        options.authorizationURL = options.authorizationURL || "https://discord.com/api/oauth2/authorize";
        options.tokenURL = options.tokenURL || "https://discord.com/api/oauth2/token";
        options.scopeSeparator = options.scopeSeparator || " ";
        OAuth2Strategy.call(this, options, verify);
        this.name = "discord";
        this._oauth2.useAuthorizationHeaderforGET(true);
    }

    userProfile(token, done) {
        this._oauth2.get("https://discord.com/api/users/@me", token, (err, body) => {
            if(err) return done(new InternalOAuthError("Couldn't fetch user profile.", err));
            let parsed;
            try {
                parsed = JSON.parse(body);
            } catch {
                return done(new Error("Couldn't parse user profile."));
            }
            parsed.provider = "discord";
            parsed.accessTOKEN = token;
    
            this.checkScope("connections", token, (err, conn) => {
                if(err) done(err);
                if(conn) parsed.connections = conn;
            });
    
            this.checkScope("guilds", token, (err, guilds) => {
                if(err) done(err);
                if(guilds) parsed.guilds = guilds;
                parsed.fetchedAt = new Date();
                return done(null, parsed);
            });
        });
    }

    checkScope(scope, token, callback) {
        if(this._scope && this._scope.indexOf(scope) !== -1) {
            this._oauth2.get(`https://discord.com/api/users/@me/${scope}`, token, (err, body) => {
                if(err) return callback(new InternalOAuthError, `Couldn't fetch ${scope}`, err);
                let json;
                try {
                    json = JSON.parse(body);
                } catch {
                    return callback(new Error("Couldn't fetch user's " + scope));
                }
    
                callback(null, json);
            });
        } else callback(null, null);
    }

    authorizationParams(options) {
        const params: {permissions?: string} = {};
        if (typeof options.permissions !== "undefined") 
            params.permissions = options.permissions;
        return params;
    }
}

util.inherits(Strategy, OAuth2Strategy);

export {Strategy};