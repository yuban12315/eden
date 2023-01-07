import type { ModelBase } from "../store/IndexDB/Database";
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

  // 查询 collection 下的 note

  return data;
};

const updateCollection = async (
  id: string,
  collection: Partial<Omit<Collection, keyof ModelBase>>
) => {
  const res = await CollectionModel.update(id, collection);

  return res;
};

const CollectionApis = {
  findCollections,
  getCollection,
  createCollection,
  updateCollection,
};

export default CollectionApis;
