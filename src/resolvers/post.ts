import { Arg, Args, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Post } from '../entities/Post';
import { MyContext } from '../types';

@Resolver()
export class PostResolver {
   @Query(() => [Post])
   async posts(@Ctx() { dbManager }: MyContext): Promise<Post[]> {
      return await dbManager.find(Post);
   }

   @Query(() => Post, { nullable: true })
   async post(
      @Arg('id') id: number,
      @Ctx() { dbManager }: MyContext
   ): Promise<Post | null> {
      return await dbManager.findOne(Post, { id: id });
   }

   @Mutation(() => Post)
   async createPost(
      @Arg('title') title: string,
      @Arg('userId') userId: number,
      @Ctx() { dbManager }: MyContext
   ): Promise<Post> {
      const post = await dbManager.create(Post, { title: title });
      await dbManager.save(post);
      return post;
   }

   @Mutation(() => Post)
   async updatePost(
      @Arg('id') id: number,
      @Arg('title') title: string,
      @Ctx() { dbManager }: MyContext
   ): Promise<Post> {
      const post = await dbManager.findOne(Post, { id: id });
      if (!post) {
         return null;
      }
      post.title = title;
      await dbManager.save(post);
      return post;
   }

   @Mutation(() => Boolean)
   async deletePost(
      @Arg('id') id: number,
      @Ctx() { dbManager }: MyContext
   ): Promise<boolean> {
      const post = await dbManager.findOne(Post, { id: id });
      if (!post) {
         return false;
      }
      await dbManager.delete(Post, { id: id });
      return true;
   }
}
