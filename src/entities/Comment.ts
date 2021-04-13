import { Field, Int, ObjectType } from 'type-graphql';
import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   ManyToMany,
   JoinTable
} from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@ObjectType()
@Entity()
export class Comment {
   @Field(() => Int)
   @PrimaryGeneratedColumn()
   id: number;

   @Field()
   @Column({ default: new Date() })
   createdAt: Date = new Date();

   @Field()
   @Column({ default: new Date() })
   updatedAt: Date;

   @Field()
   @Column()
   body: string;

   @ManyToOne(() => User, (user) => user.comments, { eager: true })
   @JoinTable()
   user: User;

   @ManyToOne(() => Post, (post) => post.comments)
   @JoinTable()
   post: Post;
}
