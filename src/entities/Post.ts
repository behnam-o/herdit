import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Post {

  @Field( ()=>Int )
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Field( () => Date)
  @Column({default:()=>'CURRENT_TIMESTAMP'})
  createdAt:Date = new Date();

  @Field(() => Date)
  @Column({default:()=>'CURRENT_TIMESTAMP'})
  updatedAt:Date;

  @Field(() => String)
  @Column()
  title!: string;
}