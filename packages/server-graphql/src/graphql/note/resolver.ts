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
    const note = await noteModel.findById(id).exec();

    if (!note) {
      throw new Error("test error");
    }

    console.log(note);

    return {
      title: note.title,
      content: note.content,
      updatedAt: note.updatedAt,
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
