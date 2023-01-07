import { ModelBase, Model } from "../Database";

export interface Note extends ModelBase {
  /** 章节的标题 */
  title: string;
  content: string;
  authorId: string;
  collectionId: string;
  /** 总字数 */
  length: number;
}

const NoteModel = new Model<Note>("Note");

export default NoteModel;
