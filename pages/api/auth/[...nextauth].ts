import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import db from "../Database";

export default NextAuth({
    providers: [
        Providers.Discord({
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET,
            scope: "identify email"
        })
    ],
    pages: {
        signIn: "/",
        signOut: "/logout",
        error: "/error"
    },
    callbacks: {
        jwt: async (token, user, account, profile) => {
            if (profile) {
                await (await db("FyreWebsite", "Users")).findOneAndUpdate(
                    { userId: profile.id },
                    { $set: { ...profile, account } },
                    { upsert: true }
                );
            }
            user && (token.user = user);
            return Promise.resolve(token);
        },
        session: async (session, user: any) => {
            const userr = await (await db("FyreWebsite", "Users")).findOne({ userId: user?.user?.id });
            session.user = userr || user.user;
            return Promise.resolve(session);
        },
        redirect: async () => Promise.resolve("/")
    }
});