import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../constants';
import { User } from '../entities/User';
import { MyContext } from '../types';

export default (context: MyContext): User => {
   const authHeader = context.expressContext.req.headers.authorization;
   if (authHeader) {
      // Bearer...
      const token = authHeader.split('Bearer ')[1];
      if (token) {
         try {
            const user = jwt.verify(token, SECRET_KEY);
            return user as User;
         } catch (err) {
            throw new AuthenticationError('invalid token');
         }
      }
      throw new Error('token format must be bearer [token]');
   }
   throw new Error('auth header must be provided');
};
