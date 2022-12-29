import IDB from "./IDB";

export default class Model<T> {
  private name: string;

  constructor(name: string) {
    this.name = name;

    IDB.registerCollection(this.name);
  }

  async add(data: T) {
    const transaction = await IDB.createTransaction(this.name, "readwrite");

    const request = transaction.objectStore(this.name).add(data);

    request.onsuccess = function (event) {
      console.log("数据写入成功");
    };

    request.onerror = function (event) {
      console.log("数据写入失败");
    };
  }

  delete(id: string) {}

  update(id: string, data: Partial<T>) {}
}
