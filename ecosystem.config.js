module.exports = {
    apps: [
        {
            name: "ita-angular-s8-v2-backup",
            script: "./bin/www",
            cwd: "/var/www/html/nodejs/ita-angular-s8-v2-backend",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
}
