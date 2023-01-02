import { ModelBase } from "../store/IndexDB/Database";
import CollectionModel, {
  Collection,
} from "../store/IndexDB/Models/Collection";

const findCollections = async () => {
  const data = await CollectionModel.find();
  return data;
};

const getCollection = async (id: string) => {
  const data = await CollectionModel.findById(id);
  return data;
};

const createCollection = async (
  collection: Omit<Collection, keyof ModelBase>
) => {
  const data = await CollectionModel.add(collection);

  return data;
};

const CollectionApis = { findCollections, getCollection, createCollection };

export default CollectionApis;
