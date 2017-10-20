"use strict";

let env = process.env.NODE_ENV;

if (env !== "dev" && env !== "staging") {
    env = "prod";
}

module.exports = require(`./${env}.js`);
