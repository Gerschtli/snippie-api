"use strict";

const redis = require("redis");

const client = redis.createClient();

client.on("connect", () => {
    console.log("Connection to redis instance established.");
});

module.exports = client;
