import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class User {
  @Field({ description: "ObjectId" })
  Id: string;

  @Field({ description: "自增的Id" })
  SystemId: string;

  @Field()
  Name: string;

  @Field()
  Password: string;

  @Field()
  CreateTime: Date;
}
