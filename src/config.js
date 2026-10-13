if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
module.exports = {
    DOM: process.env.DOM,
    PORT: parseInt(process.env.PORT),
    MONGO_URL: process.env.MONGO_URL,
    IS_PRODUCTION: process.env.NODE_ENV === "production",
};