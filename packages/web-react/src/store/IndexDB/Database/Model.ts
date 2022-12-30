import { idb } from "./IDB";
import objectid from "bson-objectid";
import Q from "q";

interface ModelBase {
  /** unique objectId */
  id: string;
  /** created timestamp */
  createdAt: number;
  /** updated timestamp */
  updatedAt: number;
}

class Model<T> {
  private name: string;

  constructor(name: string) {
    this.name = name;
    idb.registerCollection(this.name);
  }

  checkId(id: string) {
    if (!objectid.isValid(id)) {
      throw new Error(`id: "${id}" is not a valid objectId`);
    }
  }

  /** add data to objectStore */
  async add(data: Omit<T, keyof ModelBase>) {
    return new Promise<T>(async (resolve, reject) => {
      const transaction = await idb.createTransaction(this.name, "readwrite");

      const objectId = objectid();
      const createTime = new Date().getTime();

      const modelBaseData: ModelBase = {
        id: objectId.toHexString(),
        createdAt: createTime,
        updatedAt: createTime,
      };

      const modifiedData = Object.assign({}, data, modelBaseData) as T;
      const request = transaction.objectStore(this.name).add(modifiedData);

      request.onsuccess = () => {
        console.debug(this.name, "数据写入成功");
        resolve(modifiedData);
      };

      request.onerror = () => {
        console.debug(this.name, "数据写入失败");
        reject(request.error);
      };
    });
  }

  /** delete data from objectStore */
  async delete(id: string) {
    return new Promise<string>(async (resolve, reject) => {
      const transaction = await idb.createTransaction(this.name, "readwrite");

      this.checkId(id);

      const request = transaction.objectStore(this.name).delete(id);

      request.onsuccess = () => {
        console.debug(this.name, "数据删除成功");
        resolve(id);
      };

      request.onerror = () => {
        console.debug(this.name, "数据删除失败");
        reject(request.error);
      };
    });
  }

  /** update data */
  async update(id: string, data: Omit<Partial<T>, keyof ModelBase>) {
    const deferred = Q.defer<T>();

    const transaction = await idb.createTransaction(this.name, "readwrite");

    this.checkId(id);

    const request = transaction
      .objectStore(this.name)
      .index("id")
      .openCursor(IDBKeyRange.only(id));

    request.onsuccess = () => {
      const cursor = request.result;

      if (cursor) {
        const modifiedData: T = Object.assign({}, cursor.value, {
          ...data,
          updatedAt: new Date().getTime(),
        });

        cursor.update(modifiedData);
        cursor.continue();
        deferred.resolve(modifiedData);
      }
    };

    request.onerror = () => {
      console.debug(this.name, "数据更新失败");
      deferred.reject(request.error);
    };

    return deferred.promise;
  }
}

export { Model };
export type { ModelBase };
