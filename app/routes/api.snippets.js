"use strict";

const snippets = require("../controllers/snippets");

module.exports = (router) => {

    router
        .route("/")
        .get(snippets.getAll)
        .post(snippets.add);

};
