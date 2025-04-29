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