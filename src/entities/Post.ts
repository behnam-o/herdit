import { Field, Int, ObjectType } from 'type-graphql';
import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToMany,
   JoinTable,
   ManyToOne,
   OneToMany
} from 'typeorm';
import { Comment } from './Comment';
import { User } from './User';

@ObjectType()
@Entity()
export class Post {
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
   @Column()
   title: string;

   @Field(() => User)
   @ManyToOne(() => User, (user) => user.posts, { eager: true })
   @JoinTable()
   user: User;

   @Field(() => [Comment])
   @OneToMany(() => Comment, (comment) => comment.post, { eager: true })
   @JoinTable()
   comments: Comment[];
}
