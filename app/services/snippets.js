"use strict";

const database = require("./database");
const Promise  = require("bluebird");

const errorHandler = (error) => {
    console.log("services/snippets", error);
    throw error;
};

const create = (snippet) => {
    return database.setAsync(prefixKey(snippet.key), snippet.value)
        .then((result) => {
            return snippet;
        })
        .catch(errorHandler);
};

const get = (key) => {
    return database.getAsync(prefixKey(key))
        .catch(errorHandler);
};

const getAll = () => {
    return database.keysAsync()
        .then((keys) => {
            if (keys.length === 0) {
                return keys;
            }

            let query = database.multi();
            keys.forEach((key) => {
                query = query.get(prefixKey(key));
            });

            return query.execAsync()
                .then((values) => {
                    let result = [];
                    for (let i = keys.length - 1; i >= 0; i--) {
                        result.push({key: keys[i], value: values[i]});
                    }
                    return result;
                });
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
    return `snippet:${key}`;
};

const remove = (key) => {
    return database.delAsync(prefixKey(key))
        .then((result) => {
            return { message: `Removed ${key}.` };
        })
        .catch(errorHandler);
};

const update = (snippet) => {
    return database.setAsync(prefixKey(snippet.key), snippet.value)
        .then((result) => {
            return snippet;
        })
        .catch(errorHandler);
}

module.exports = {
    create,
    get,
    getAll,
    isValid,
    keyExists,
    remove,
    update,
};
