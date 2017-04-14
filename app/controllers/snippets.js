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

    handlePromise(response,
        service.keyExists(snippet.key)
            .then((keyExists) => {
                if (keyExists) {
                    response.status(422).json({
                        error: "Key already defined."
                    });
                    return;
                }

                return service.create(snippet);
            })
    );
};

const get = (request, response) => {
    const key = request.params.key;

    handlePromise(response,
        service.keyExists(key)
            .then((keyExists) => {
                if (!keyExists) {
                    response.status(404).json({
                        error: "Key not found."
                    });
                    return;
                }

                return service.get(key);
            })
    );
};

const getAll = (request, response) => {
    handlePromise(response,service.getAll());
};

const handlePromise = (response, promise) => {
    promise
        .then((result) => {
            response.json(result);
        })
        .catch((error) => {
            response.status(500).json({error});
        });
};

const remove = (request, response) => {
    const key = request.params.key;

    handlePromise(response,
        service.keyExists(key)
            .then((keyExists) => {
                if (!keyExists) {
                    response.status(404).json({
                        error: "Key not found."
                    });
                    return;
                }

                return service.remove(key);
            })
    );
};

module.exports = {
    add,
    remove,
    get,
    getAll,
};
