import { AuthenticationError } from 'apollo-server-errors';
import { Arg, Args, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Post } from '../entities/Post';
import { MyContext } from '../types';
import checkAuth from '../utils/checkAuth';
// import checkAuth from '../utils/checkAuth';

@Resolver()
export class PostResolver {
   @Query(() => [Post])
   async posts(@Ctx() { dbManager }: MyContext): Promise<Post[]> {
      const posts = await dbManager.find(Post);
      posts.sort((p1, p2) => (p1.createdAt > p2.createdAt ? -1 : 1));
      return posts;
   }

   @Mutation(() => Post)
   async createPost(
      @Arg('title') title: string,
      @Arg('userId') userId: number,
      @Ctx() context: MyContext
   ): Promise<Post> {
      const user = checkAuth(context);
      const post = await context.dbManager.create(Post, {
         title: title,
         userId: user.id
      });
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
      if (user.id !== post.userId) {
         throw new AuthenticationError("You can't delete someone else's post!");
      }
      await context.dbManager.delete(Post, { id: id });
      return true;
   }
}
