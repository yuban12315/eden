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
  async content(@Arg("id") id: string): Promise<GetNoteContentResponse> {
    return {
      title: "test",
      content: "tss",
      updateTime: new Date(),
    };
  }

  @Query(() => Note)
  async note(@Arg("id") id: string): Promise<Note | null> {
    return await noteModel.findById(id).exec();
  }

  @Mutation(() => String)
  async createNote(@Arg("Data") data: CreateNoteParams, @Ctx() ctx: Context) {
    const { _id } = await noteModel.create({ ...data });
    return _id;
  }

  @Mutation(() => String)
  async updateNote(@Arg("Data") data: UpdateNoteParams, @Ctx() ctx: Context) {}

  @Mutation(() => String)
  async deleteNote(@Arg("Id") Id: String, @Ctx() ctx: Context) {}
}
