import { connect, Db } from "mongodb";
import chalk from "chalk";

export class Database {
    db: Db;
    connected = false;

    async connect() {
        console.log(chalk.bgYellow(" ") + " Database... connecting");
		const db = await connect(process.env.MONGO_URI as string, {
			useUnifiedTopology: true,
			useNewUrlParser: true
        });
        console.log(chalk.bgGreen(" ") + " Database... connected!");
        this.connected = true;
        this.db = db.db("FyreSite");
        return db;
    }

    async fetchApplications() {
        return await this.db.collection("applications").find({}).toArray();
    }
}