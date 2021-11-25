import { ObjectType, Field, InputType } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { User } from "../user/entity";

// TODO: add typegoose

@ObjectType()
export class Note {
  _id: Types.ObjectId;

  @Field({ description: "文章的唯一Id,自增" })
  id: string;

  @prop()
  @Field({ description: "文章的标题" })
  title: string;

  @Field(() => [NoteContent], { description: "文章的内容" })
  contents: NoteContent[];

  @prop()
  @Field()
  content: string;

  @prop()
  @Field()
  creator: User;

  @prop()
  @Field()
  updateTime: Date;

  @prop()
  @Field()
  createTime: Date;
}

export const noteModel = getModelForClass(Note);

// TODO: 文章是否需要考虑版本？在未实现自动保存的时候，可以缓存一下试试
@ObjectType()
export class NoteContent {
  @Field({ description: "文章Markdown内容" })
  content: string;

  @Field({ description: "文章版本，最多缓存6个版本" })
  version: string;

  @Field()
  updateTime: Date;
}

@ObjectType()
export class GetNoteContentResponse {
  @Field({ description: "文章的标题" })
  title: string;

  @Field()
  content: string;

  @Field()
  updateTime: Date;
}

@InputType()
export class CreateNoteParams {
  @Field()
  title: string;

  @Field()
  content: string;
}

@InputType()
export class UpdateNoteParams {
  @Field({ description: "文章的唯一Id" })
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;
}
