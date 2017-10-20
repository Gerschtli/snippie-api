"use strict";

const Promise = require("bluebird");
const redis   = Promise.promisifyAll(require("redis"));
const config  = require("../config");

const client = redis.createClient(
    config.redis.port,
    config.redis.host,
    { password: config.redis.password }
);

client.auth(config.redis.password, (err) => {
    if (err) {
        throw err;
    }
});

client.on("connect", () => {
    console.log("Connection to redis instance established.");
});

module.exports = client;
