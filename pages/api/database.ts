import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default async function database(dbName: string, collName: string) {
    if (typeof dbName !== "string") return (collName as any).json({ msg: "no" });
    if (!client.isConnected()) await client.connect();
    return client.db(dbName).collection(collName);
}