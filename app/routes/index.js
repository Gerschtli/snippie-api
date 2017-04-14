"use strict";

const express    = require("express");
const requireDir = require("require-dir");
const routes     = requireDir();

function buildRoute(filename) {
    return "/" + filename.replace(".", "/");
}

module.exports = (app) => {

    Object.keys(routes).forEach((filename) => {
        const router = express.Router();

        // require route
        routes[filename](router);

        app.use(buildRoute(filename), router);
    });

};
