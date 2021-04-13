import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import { Arg, Args, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Comment } from '../entities/Comment';
import { Post } from '../entities/Post';
import { MyContext } from '../types';
import checkAuth from '../utils/checkAuth';

@Resolver()
export class CommentResolver {
   @Mutation(() => Comment)
   async createComment(
      @Arg('postId') postId: number,
      @Arg('body') body: string,
      @Ctx() context: MyContext
   ): Promise<Comment> {
      const user = checkAuth(context);

      if (body.trim() === '') {
         throw new UserInputError('empty comment', {
            errors: {
               body: 'comment body must not be empty'
            }
         });
      }

      const post = await context.dbManager.findOne(Post, {
         id: postId
      });

      if (!post) {
         throw new UserInputError('could not find a post with that id', {
            errors: {
               body: 'post not found'
            }
         });
      }

      const comment = await context.dbManager.create(Comment, {
         user: user,
         body: body,
         post: post
      });

      await context.dbManager.save(comment);
      return comment;
   }

   @Mutation(() => Boolean)
   async deleteComment(
      @Arg('commentId') commentId: number,
      @Ctx() context: MyContext
   ): Promise<boolean> {
      const user = checkAuth(context);

      const comment = await context.dbManager.findOne(Comment, {
         id: commentId
      });

      if (!comment) {
         throw new UserInputError('could not find a comment with that id', {
            errors: {
               body: 'comment not found'
            }
         });
      }

      if (user.id !== comment.user.id) {
         throw new UserInputError("you cannot delete others' comments", {
            errors: {
               body: 'only owners can delete their comments.'
            }
         });
      }

      await context.dbManager.remove(comment);

      return true;
   }

   @Query(() => [Comment])
   async getComments(@Ctx() context: MyContext): Promise<Comment[]> {
      const comments = await context.dbManager.find(Comment);
      return comments;
   }
}
