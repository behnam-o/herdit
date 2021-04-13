import { createConnection } from 'typeorm';
import { Post } from './entities/Post';
import credentials from './credentials';
import { User } from './entities/User';
import { Comment } from './entities/Comment';
export default ({
   type: 'postgres',
   host: credentials.db.host,
   port: credentials.db.port,
   username: credentials.db.username,
   password: credentials.db.password,
   database: credentials.db.database,
   synchronize: true,
   logging: true,
   entities: [Post, User, Comment],
   migrations: ['src/migration/*.ts'],
   cli: {
      migrationsDir: 'src/migration'
   }
} as unknown) as Parameters<typeof createConnection>[0];
