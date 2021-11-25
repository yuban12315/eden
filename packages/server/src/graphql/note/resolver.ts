import { Arg, Query, Resolver } from "type-graphql";
import { GetNoteContentResponse, Note } from "./entity";

type GetNoteContent = Pick<Note, "Title" | "Content" | "UpdateTime">;

@Resolver()
export default class NoteResolver {
  @Query(() => GetNoteContentResponse)
  async getNoteConent(@Arg("Id") Id: string): Promise<GetNoteContentResponse> {
    return {
      Title: "test",
      Content: "tss",
      UpdateTime: new Date(),
    };
  }
}
