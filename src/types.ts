import { EntityManager } from 'typeorm';

export type MyContext = {
   dbManager: EntityManager;
};
