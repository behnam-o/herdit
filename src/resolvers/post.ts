import { Arg, Args, Ctx, Int, Query, Resolver } from "type-graphql";
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
    post( @Arg('id', ()=>Int) id:number,
        @Ctx() {orm}:MyContext ):Promise<Post | null> {
        console.log(orm)
        return orm.manager.findOne(Post,{id});
    }
}