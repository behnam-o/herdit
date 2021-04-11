import { ExpressContext, Request } from 'apollo-server-express';
import { EntityManager } from 'typeorm';

export type MyContext = {
   expressContext: ExpressContext;
   dbManager: EntityManager;
};
