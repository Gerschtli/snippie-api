"use strict";

const database = require("./database");
const Promise  = require("bluebird");

const PREFIX = "snippet:";

const errorHandler = (error) => {
    console.log("services/snippets", error);
    throw error;
};

const create = (snippet) => {
    return database.hmsetAsync(prefixKey(snippet.key), snippet)
        .then((result) => {
            return snippet;
        })
        .catch(errorHandler);
};

const get = (key) => {
    return database.hgetallAsync(prefixKey(key))
        .catch(errorHandler);
};

const getAll = (search, limit) => {
    return database.scanAsync(1, "MATCH", prefixKey(search), "COUNT", limit)
        .then((result) => {
            const keys = result[1];
            if (keys.length === 0) {
                return [];
            }

            let query = database.multi();
            keys.forEach((key) => {
                query = query.hgetall(key);
            });

            return query.execAsync();
        })
        .catch(errorHandler);
};

const isValid = (snippet) => {
    return typeof snippet.key === "string" && typeof snippet.value === "string";
};

const keyExists = (key) => {
    return database.existsAsync(prefixKey(key))
        .catch(errorHandler);
};

const prefixKey = (key) => {
    return `${PREFIX}${key}`;
};

const remove = (key) => {
    return database.delAsync(prefixKey(key))
        .then((result) => {
            return { message: `Removed ${key}.` };
        })
        .catch(errorHandler);
};

const removePrefix = (key) => {
    return key.substring(PREFIX.length);
}

module.exports = {
    create,
    get,
    getAll,
    isValid,
    keyExists,
    remove,
    update: create,
};
