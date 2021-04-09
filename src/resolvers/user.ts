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

@InputType()
class UsernamePasswordInput {
   @Field()
   username: string;
   @Field()
   password: string;
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
      const hashedPassword = await argon2.hash(input.password);
      const user = await dbManager.create(User, {
         username: input.username,
         password: hashedPassword
      });
      await dbManager.save(user);
      return user;
   }

   @Mutation(() => User)
   async login(
      @Arg('input') input: UsernamePasswordInput,
      @Ctx() { dbManager }: MyContext
   ): Promise<User> {
      const user = await dbManager.findOne(User, {
         username: input.username
      });
      if (user) {
         const valid = await argon2.verify(user.password, input.password);
         if (valid) {
            return user;
         }
      }
      return null;
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
