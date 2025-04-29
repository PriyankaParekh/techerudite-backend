module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'Asha',
            password: 'Asha@200$',
            database: 'registration',
        },
        migrations: {
            directory: './migrations',
        },
    },
};