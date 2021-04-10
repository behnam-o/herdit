import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Post {
   @Field(() => Int)
   @PrimaryGeneratedColumn()
   id: number;

   @Field(() => Int)
   userId: number;

   @Field()
   @Column({ default: new Date() })
   createdAt: Date;

   @Field()
   @Column({ default: new Date() })
   updatedAt: Date;

   @Field()
   @Column()
   title: string;

   @Field(() => [String])
   @Column({ array: true, default: [] })
   comments: string;
}
