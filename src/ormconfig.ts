import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import credentials from "./credentials";
export default {
    "type": "postgres",
    "host": credentials.db.host,
    "port": credentials.db.port,
    "username": credentials.db.username,
    "password": credentials.db.password,
    "database": credentials.db.database,
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