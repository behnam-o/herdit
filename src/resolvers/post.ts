import { Arg, Args, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {
    @Query( () => [Post] )
    posts( @Ctx() {orm}:MyContext ):Promise<Post[]> {
        console.log(orm)
        return orm.manager.find(Post);
    }

    @Query( () => Post, {nullable:true} )
    post( @Arg('id') id:number,
        @Ctx() {orm}:MyContext ):Promise<Post | null> {
        return orm.manager.findOne(Post,{id:id});
    }

    @Mutation( () => Post )
    async createPost( @Arg('title') title:string,
        @Ctx() {orm}:MyContext ):Promise<Post | null> {
        const post = orm.manager.create(Post,{title:title});
        await orm.manager.save(post);
        return post;
    }

    @Mutation( () => Post, {nullable:true} )
    async updatePost( 
        @Arg('id') id:number,
        @Arg('title', ()=>String, {nullable:true}) title:string,
        @Ctx() {orm}:MyContext ):Promise<Post | null> {
        const post = await orm.manager.findOne(Post,{id:id});
        if( !post ){
            return null;
        }
        if( typeof title !== "undefined"){
            post.title = title;
            await orm.manager.save(post);
        }
        
        return post;
    }

    @Mutation( () => Boolean )
    async deletePostById( 
        @Arg('id') id:number,
        @Ctx() {orm}:MyContext ):Promise<boolean> {
        const post = await orm.manager.findOne(Post,{id:id});
        if( !post ){
            return false;
        }
        await orm.manager.delete(Post,{id:id});
        return true;
    }
}