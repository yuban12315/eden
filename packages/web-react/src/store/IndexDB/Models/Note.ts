import { ModelBase, Model } from "../Database";

export interface Note extends ModelBase {
  title: string;
  content: string;
  authorId: string;
  collectionId: string;
}

const NoteModel = new Model<Note>("Note");

export default NoteModel;
