import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
const db = mysql.createConnection({
    host: process.env.HOSTNAME || "localhost",
    user: process.env.USERNAME || "Asha",
    password: process.env.PASSWORD || "Asha@200$",
    database: process.env.DATABASE || "registration",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to MySQL as ID " + db.threadId);
});

export default db;