import { Context } from "koa";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  GetNoteContentResponse,
  Note,
  CreateNoteParams,
  UpdateNoteParams,
  noteModel,
} from "./entity";

@Resolver()
export default class NoteResolver {
  @Query(() => GetNoteContentResponse)
  async getNoteConent(@Arg("id") id: string): Promise<GetNoteContentResponse> {
    return {
      title: "test",
      content: "tss",
      updateTime: new Date(),
    };
  }

  @Query(() => Note)
  async getNote(@Arg("id") id: string): Promise<Note | null> {
    return await noteModel.findById(id).exec();
  }

  @Mutation(() => String)
  async createNote(@Arg("Data") data: CreateNoteParams, @Ctx() ctx: Context) {
    // TODO: 创建时获取自增Id
    const res = await noteModel.create({ ...data });
    console.log(res);
    return res;
  }

  @Mutation(() => String)
  async updateNote(@Arg("Data") data: UpdateNoteParams, @Ctx() ctx: Context) {}

  @Mutation(() => String)
  async deleteNote(@Arg("Id") Id: String, @Ctx() ctx: Context) {}
}
