import { ModelBase, Model } from "../Database";

export interface Collection extends ModelBase {
  name: string;
  coverImage?: string;
  authorId: string;
}

const CollectionModel = new Model<Collection>("Collection");

export default CollectionModel;
