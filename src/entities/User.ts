import { Field, Int, ObjectType } from 'type-graphql';
import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToMany,
   OneToMany
} from 'typeorm';
import { Comment } from './Comment';
import { Post } from './Post';

@ObjectType()
@Entity()
export class User {
   @Field(() => Int)
   @PrimaryGeneratedColumn()
   id: number;

   @Field()
   @Column({ default: new Date() })
   createdAt: Date;

   @Field()
   @Column({ default: new Date() })
   updatedAt: Date;

   @Field()
   @Column({ unique: true })
   username!: string;

   @Column()
   password!: string;

   @OneToMany((type) => Post, (post) => post.user)
   posts: Post[];

   @OneToMany((type) => Comment, (comment) => comment.user)
   comments: Comment[];
}
