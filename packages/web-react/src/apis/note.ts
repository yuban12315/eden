import type { ModelBase } from "../store/IndexDB/Database";
import NoteModel, { Note } from "../store/IndexDB/Models/Note";
import { useStore } from "../store/zustand";

const findNotes = async (collectionId: string) => {
  const data = await NoteModel.find({
    collectionId: collectionId,
  });
  return data;
};

const getNote = async (id: string) => {
  const data = await NoteModel.findById(id);
  return data;
};

export type CreateNoteParams = Pick<Note, "collectionId" | "content" | "title">;

const createNote = async (note: CreateNoteParams) => {
  const user = useStore.getState().user;
  const params: Omit<Note, keyof ModelBase> = {
    ...note,
    authorId: user.id,
    length: note.content.length,
  };

  const data = await NoteModel.add(params);

  return data;
};

const updateNote = async (
  id: string,
  Note: Partial<Omit<Note, keyof ModelBase>>
) => {
  const res = await NoteModel.update(id, Note);

  return res;
};

const NoteApis = {
  findNotes,
  getNote,
  createNote,
  updateNote,
};

export default NoteApis;
