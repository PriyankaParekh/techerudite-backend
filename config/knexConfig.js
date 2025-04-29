import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Required for __dirname in ES modules
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root, not from /config
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export default {
    development: {
        client: "mysql",
        connection: {
            host: process.env.HOSTNAME || "localhost",
            user: process.env.USER || "Asha",
            password: process.env.PASSWORD || "Asha@200$",
            database: process.env.DATABSE || "registration",
        },
        migrations: {
            directory: "../migration",
        },
    },
};