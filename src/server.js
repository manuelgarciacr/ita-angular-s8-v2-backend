const config = require("../src/config");
const cors = require("cors");
const express = require("express");
const app = express();
//const tcpPortUsed = require("tcp-port-used");
const bodyParser = require("body-parser");
const qs = require("qs");

/// Settings

app.set("query parser", function (str) {
    return qs.parse(str, {
        parameterLimit: 1,
        ignoreQueryPrefix: true,
        allowDots: false,
        charset: "iso-8859-1",
    });
});

// Middleware

//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(cors({ origin: config.IS_PRODUCTION ? "https://manuelgc.eu" : "http://localhost:4200" }));

// Routes

app.use(require("./routes/users"));
app.use(require("./routes/features"));
app.use(require("./routes/events"));
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

module.exports = app;

// Middleware to process errors

app.use((err, _req, res, _next) => {
    const desc = err?.toString().split("\n")[0];
    const error = err.error;
    const path = err.path;
    const reason = err.reason?.toString().split("\n")[0];
    const msg = { desc, error, path, reason };

    if (!desc) delete msg.desc;
    if (!error) delete msg.error;
    if (!path) delete msg.path;
    if (!reason) delete msg.reason;

    console.log("ERR", msg);

    res.status(err.statusCode || 500)
        .json(msg)
        .send();
});

