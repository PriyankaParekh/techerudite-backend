import mysql from "mysql";

const config = {
    host: process.env.HOSTNAME || "localhost",
    user: process.env.USERNAME || "Asha",
    password: process.env.PASSWORD || "Asha@200$",
};

const dbName = process.env.DATABASE || "registration";

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
        console.error("Error connecting:", err.stack);
        return;
    }

    connection.query(
        `CREATE DATABASE IF NOT EXISTS\ $ { dbName }\
        `,
        (err, result) => {
            if (err) {
                console.error("Error creating database:", err);
            } else {
                console.log(`Database "${dbName}"
                    ensured.`);
            }
            connection.end();
        }
    );
});