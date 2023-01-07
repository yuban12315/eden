import { Model, ModelBase } from "../Database";

export interface Collection extends ModelBase {
  name: string;
  description: string;
  coverImage?: string;
  authorId: string;
}

const CollectionModel = new Model<Collection>("Collection");

export default CollectionModel;
