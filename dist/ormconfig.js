"use strict";
exports.__esModule = true;
var Post_1 = require("./entities/Post");
exports["default"] = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "newPassword",
    "database": "beddit",
    "synchronize": true,
    "logging": true,
    "entities": [
        Post_1.Post
    ],
    "migrations": [
        "src/migration/*.js"
    ],
    "subscribers": [
        "src/subscriber/*.js"
    ]
};
