import { __prod__ } from "./constants";
import { createConnection } from "typeorm";
import "reflect-metadata";
import ormconfig from "./ormconfig";
import express from "express";
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import { PostResolver } from "./resolvers/post";
import { Post } from "./entities/Post";
const main = async () => {
    const orm = await createConnection( ormconfig );
    // orm.manager.insert(Post,{title:"Sample Post",createdAt:new Date(),updatedAt:new Date()});
    const app = express();

    const appolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[PostResolver],
            validate:false,
        }),
        context: () => ({ orm:orm })
    });

    appolloServer.applyMiddleware({app});

    app.listen(4000, ()=>{
        console.log("server started on port 4000");
    })
}
main().catch(err=>{
    console.log("ERROR in main():",err)
});

console.log("Hello Wold!");
