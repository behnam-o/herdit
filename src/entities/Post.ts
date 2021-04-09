import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Post {
   @Field(() => Int)
   @PrimaryGeneratedColumn()
   id!: number;

   @Field()
   @Column({ default: () => 'CURRENT_TIMESTAMP' })
   createdAt: Date = new Date();

   @Field()
   @Column({ default: () => 'CURRENT_TIMESTAMP' })
   updatedAt: Date;

   @Field()
   @Column()
   title!: string;
}
