import { __prod__ } from './constants';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import ormconfig from './ormconfig';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';

const PORT = 4000;

const main = async () => {
   const dbManager = (await createConnection(ormconfig)).manager;
   const appolloServer = new ApolloServer({
      schema: await buildSchema({
         resolvers: [PostResolver, UserResolver],
         validate: false
      }),
      context: () => ({ dbManager: dbManager })
   });
   const app = express();
   appolloServer.applyMiddleware({ app });
   app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
   });
};

main().catch((err) => {
   console.log('ERROR in main():', err);
});
