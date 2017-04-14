"use strict";

const snippets = {
    get: (request, response) => {
        response.json({ message: "Snippets / GET" });
    },
};

module.exports = snippets;
