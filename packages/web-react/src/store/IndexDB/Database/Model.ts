import { idb } from "./IDB";
import objectid from "bson-objectid";
import Q from "q";
import { isUndefined } from "lodash";

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

  async find(query: Partial<T> = {}) {
    const deferred = Q.defer<T[]>();

    const transaction = await idb.createTransaction(this.name, "readonly");
    const request = transaction.objectStore(this.name).openCursor();

    const datas: T[] = [];

    // onsuccess will be called untill no data to be found
    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        const data = cursor.value as T;

        // find by user query
        const qualifications = Object.entries(query);
        let qualificationCount = qualifications.length;

        qualifications.forEach(([key, value]) => {
          // query specific string field
          if (typeof value === "string" && data[key as keyof T] === value) {
            qualificationCount--;
          }
        });

        qualificationCount === 0 && datas.push(data);

        cursor.continue();
      } else {
        deferred.resolve(datas);
      }
    };

    request.onerror = () => {
      console.debug(this.name, "数据查询失败");
      deferred.reject(request.error);
    };

    return deferred.promise;
  }

  async findById(id: string) {
    const deferred = Q.defer<T>();

    const transaction = await idb.createTransaction(this.name, "readonly");
    const request = transaction
      .objectStore(this.name)
      .index("id")
      .openCursor(IDBKeyRange.only(id));

    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        cursor.continue();
        deferred.resolve(cursor.value);
      }
    };

    request.onerror = () => {
      console.debug(this.name, "数据查询失败");
      deferred.reject(request.error);
    };

    return deferred.promise;
  }

  /** update data */
  async update(id: string, data: Omit<Partial<T>, keyof ModelBase>) {
    const deferred = Q.defer<T>();

    this.checkId(id);

    const transaction = await idb.createTransaction(this.name, "readwrite");

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
