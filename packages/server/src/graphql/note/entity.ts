import { ObjectType, Field, InputType } from "type-graphql";
import { User } from "../user/entity";

// TODO: add typegoose

@ObjectType()
export class Note {
  @Field({ description: "文章的唯一Id" })
  Id: string;

  @Field({ description: "文章的标题" })
  Title: string;

  @Field(() => [NoteContent], { description: "文章的内容" })
  Contents: NoteContent[];

  @Field()
  Content: string;

  // 如果Field不写User会发生什么?
  // @Field(() => User)
  @Field()
  Creator: User;

  @Field()
  UpdateTime: Date;

  @Field()
  CreateTime: Date;
}

// TODO: 文章是否需要考虑版本？在未实现自动保存的时候，可以缓存一下试试
@ObjectType()
export class NoteContent {
  @Field({ description: "文章Markdown内容" })
  Content: string;

  @Field({ description: "文章版本，最多缓存6个版本" })
  Version: string;

  @Field()
  UpdateTime: Date;
}

@InputType()
export class CreateNoteParams {
  @Field()
  Title: string;

  @Field()
  Content: string;
}

@ObjectType()
export class GetNoteContentResponse {
  @Field({ description: "文章的标题" })
  Title: string;

  @Field()
  Content: string;

  @Field()
  UpdateTime: Date;
}
