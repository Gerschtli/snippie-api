"use strict";

const bodyParser = require("body-parser");
const morgan     = require("morgan");

module.exports = (app) => {
    app.use(morgan("dev")); // log requests to the console
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
};
