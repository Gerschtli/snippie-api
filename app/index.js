"use strict";

const express     = require("express");
const middlewares = require("./middlewares");
const routes      = require("./routes");

const port = process.env.PORT || 8080;

const app = express();

middlewares(app);
routes(app);

app.listen(port, () => {
    console.log("Server runs on port " + port);
});

module.exports = app;
