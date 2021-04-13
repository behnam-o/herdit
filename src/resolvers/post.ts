import { AuthenticationError } from 'apollo-server-errors';
import { Arg, Args, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { MyContext } from '../types';
import checkAuth from '../utils/checkAuth';

@Resolver()
export class PostResolver {
   @Query(() => [Post])
   async posts(@Ctx() { dbManager }: MyContext): Promise<Post[]> {
      const posts = await dbManager.getRepository(Post).find();
      console.log(posts);
      posts.sort((p1, p2) => (p1.createdAt > p2.createdAt ? -1 : 1));
      return posts;
   }

   @Mutation(() => Post)
   async createPost(
      @Arg('title') title: string,
      @Ctx() context: MyContext
   ): Promise<Post> {
      const user = checkAuth(context);
      const post = await context.dbManager.getRepository(Post).create({
         title: title
      });
      post.user = user;
      await context.dbManager.save(post);
      return post;
   }

   @Mutation(() => Boolean)
   async deletePost(
      @Arg('id') id: number,
      @Ctx() context: MyContext
   ): Promise<boolean> {
      const user = checkAuth(context);
      const post = await context.dbManager.findOne(Post, { id: id });
      if (!post) {
         return false;
      }
      if (user.id !== post.user.id) {
         throw new AuthenticationError("You can't delete someone else's post!");
      }
      await context.dbManager.delete(Post, { id: id });
      return true;
   }
}
