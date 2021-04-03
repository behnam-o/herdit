import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Post {

  @Field( ()=>Int )
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Field( () => Date)
  @Column()
  createdAt:Date;

  @Field(() => Date)
  @Column()
  updatedAt:Date;

  @Field(() => String)
  @Column()
  title!: string;
}