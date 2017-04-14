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
            .then((result) => {
                if (result) {
                    response.status(422).json({
                        error: "Key already defined."
                    });
                    return;
                }

                return service.create(snippet);
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

module.exports = {
    add,
    getAll,
};
