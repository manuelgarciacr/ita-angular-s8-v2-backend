module.exports = {
    apps: [
        {
            name: "ita-angular-s8-v2-backup",
            script: "./bin/www",
            cwd: "/var/www/html/nodejs/ita-angular-s8-v2-backend",
            env_production: {
                NODE_ENV: "production",
                MONGO_URL: "mongodb://localhost:27017/ita-angular-s8-v2",
                PORT: 3200,
                DOM: "manuelgc.eu"
            },
        },
    ],
};
