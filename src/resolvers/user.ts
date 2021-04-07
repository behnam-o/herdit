import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}
@ObjectType()
class UserResponse {
    @Field( ()=>[FieldError], {nullable:true})
    errors?: FieldError[]

    @Field(()=>User, {nullable:true})
    user?: User
}

@Resolver()
export class UserResolver {
    @Mutation( () => UserResponse )
    async register ( 
        @Arg('options') options :UsernamePasswordInput,
        @Ctx() {orm}:MyContext 
    ):Promise<UserResponse> {
        if ( options.username.length <=3 || options.password.length <=3  ){
            return {
                errors:[{
                    field:'user+pass',
                    message:'username and password must be longer than 4 letters'
                }]
            }
        }
        const hashedPassword = await argon2.hash(options.password);
        const user = await orm.manager.create(User,{username:options.username,password:hashedPassword});
        
        var retObj = new UserResponse();
        try {
            const created =  await orm.manager.save(user);
            retObj.user = created;
        } catch (err) {
            if (err.code === '23505')
            retObj.errors = [
                {
                    field:'username',
                    message:'username already taken'
                }
            ]
        }
        return retObj
    }

    @Mutation( () => UserResponse )
    async login ( @Arg('options') options :UsernamePasswordInput,
            @Ctx() {orm}:MyContext ):Promise<UserResponse> {
        const user = await orm.manager.findOne(User,{username:options.username});
        const valid = user && await argon2.verify(user.password, options.password)
        if(!valid){
            return {
                errors:[{
                    field:'user+pass',
                    message:'username password combo dont exists'
                }]
            }
        }
        return {user:user};
    }

}