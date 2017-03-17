"use strict";

module.exports = (router) => {

    router
        .route("/")
        .get((req, res) => {
            res.json({ message: "Snippets / GET" });
        });

};
