import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
export default {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "",
    "password": "",
    "database": "",
    "synchronize": true,
    "logging": true,
    "entities": [
        Post
    ],
    "migrations": [
        "src/migration/*.js"
    ],
    "subscribers": [
        "src/subscriber/*.js"
    ]
} as unknown as Parameters<typeof createConnection>[0];