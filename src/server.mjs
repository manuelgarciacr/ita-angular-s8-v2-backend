

import config from "../src/config.js";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import qs from "qs";

const app = express();

// Settings
app.set("query parser", str => {
    return qs.parse(str, {
        parameterLimit: 1,
        ignoreQueryPrefix: true,
        allowDots: false,
        charset: "iso-8859-1",
    });
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    cors({
        // origin: config.IS_PRODUCTION
        //     ? "https://manuelgc.eu"
        //     : "http://localhost:4200",
        origin(origin, callback) {
            const allowed = config.IS_PRODUCTION
                ? "https://manuelgc.eu"
                : "http://localhost:4200";

            if (!origin || origin === allowed) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        },
    }),
);

// Routes
import usersRouter from "./routes/users.js";
import featuresRouter from "./routes/features.js";
import eventsRouter from "./routes/events.js";

app.use(usersRouter);
app.use(featuresRouter);
app.use(eventsRouter);

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

// Error middleware
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

    res.status(err.statusCode || 500).json(msg);
});

export default app;
