import { ObjectType, Field } from "type-graphql";
import { Types } from "mongoose";

@ObjectType()
export class User {
  _id: Types.ObjectId;

  @Field({ description: "UserId,自增" })
  id: string;

  @Field()
  name: string;

  @Field()
  nickname: string;

  @Field()
  password: string;

  @Field()
  createTime: Date;
}
