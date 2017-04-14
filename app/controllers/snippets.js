"use strict";

const service = require("../services/snippets");

const add = (request, response) => {
    const snippet = request.body;
    if (!service.isValid(snippet)) {
        response.status(422).json({
            error: "Object is not valid."
        });
        return;
    }

    service.keyExists(snippet.key)
        .then((result) => {
            if (result) {
                response.status(422).json({
                    error: "Key already defined."
                });
                return;
            }

            return service.create(snippet);
        })
        .then((result) => {
            response.json(result);
        })
        .catch((error) => {
            response.status(500).json({error});
        });
};

const getAll = (request, response) => {
    service.getAll()
        .then((result) => {
            response.json(result);
        })
        .catch((error) => {
            response.status(500).json({error});
        });
};

module.exports = {
    add,
    getAll,
};
