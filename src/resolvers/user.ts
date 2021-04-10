import {
   Arg,
   Ctx,
   Field,
   InputType,
   Mutation,
   ObjectType,
   Resolver,
   Query
} from 'type-graphql';
import { User } from '../entities/User';
import { MyContext } from '../types';
import argon2 from 'argon2';
import { SECRET_KEY } from '../constants';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-errors';
import {
   validateLoginInput,
   validateRegisterInputs
} from '../utils/validators';
@InputType()
class UsernamePasswordInput {
   @Field()
   username: string;
   @Field()
   password: string;
}

function generateToken(user) {
   return 'AAAA';
}
@Resolver()
export class UserResolver {
   @Query(() => [User])
   async users(@Ctx() { dbManager }: MyContext): Promise<User[]> {
      const users = await dbManager.find(User, {});
      console.log(users);
      return users;
   }

   @Mutation(() => User)
   async register(
      @Arg('input') input: UsernamePasswordInput,
      @Ctx() { dbManager }: MyContext
   ): Promise<User> {
      // validate input
      const { valid, errors } = validateRegisterInputs(
         input.username,
         input.password
      );
      if (!valid) {
         throw new UserInputError('Validation errors', {
            errors: errors
         });
      }

      // doesn't exist
      const existingUser = await dbManager.findOne(User, {
         username: input.username
      });
      if (existingUser) {
         throw new UserInputError('Username is taken', {
            errors: {
               username: 'This username is already taken.'
            }
         });
      }

      // hash pass
      const hashedPassword = await argon2.hash(input.password);
      const user = await dbManager.create(User, {
         username: input.username,
         password: hashedPassword
      });
      await dbManager.save(user);
      // const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
      return user;
   }

   @Mutation(() => User)
   async login(
      @Arg('input') input: UsernamePasswordInput,
      @Ctx() { dbManager }: MyContext
   ): Promise<User> {
      const { valid, errors } = validateLoginInput(
         input.username,
         input.password
      );
      if (!valid) {
         throw new UserInputError('Validation errors', {
            errors: errors
         });
      }

      const user = await dbManager.findOne(User, {
         username: input.username
      });

      if (!user) {
         errors.general = 'user not found';
         throw new UserInputError('Username not found.', {
            errors: errors
         });
      }

      const validPassword = await argon2.verify(user.password, input.password);
      if (!validPassword) {
         errors.general = 'password not valid';
         throw new UserInputError('The provided password is not valid.', {
            errors: errors
         });
      }

      // issue token
      return user;
   }

   @Mutation(() => Boolean)
   async deleteUser(
      @Arg('id') id: number,
      @Ctx() { dbManager }: MyContext
   ): Promise<boolean> {
      const user = await dbManager.findOne(User, { id: id });
      if (!user) {
         return false;
      }
      await dbManager.delete(User, { id: id });
      return true;
   }
}
