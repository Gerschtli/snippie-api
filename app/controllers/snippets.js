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
    const limit  = request.query.limit || 100;
    const search = request.query.search ? `*${request.query.search}*` : "*";

    handlePromise(response, service.getAll(search, limit));
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

const update = (request, response) => {
    const key = request.params.key;
    const snippet = request.body;

    if (!service.isValid(snippet) || key != snippet.key) {
        response.status(422).json({
            error: "Object is not valid."
        });
        return;
    }

    handlePromise(response,
        service.keyExists(key)
            .then((keyExists) => {
                if (!keyExists) {
                    response.status(404).json({
                        error: "Key not found."
                    });
                    return;
                }

                return service.update(snippet);
            })
    );
};

module.exports = {
    add,
    get,
    getAll,
    update,
    remove,
};
