import indexDB from "./IndexDB";

export default class Model<T> {
  private name: string;

  constructor(name: string) {
    this.name = name;

    // init
    this.initObjectStore();
  }

  async initObjectStore() {
    const db = await indexDB.getDB();

    if (!db.objectStoreNames.contains(this.name)) {
      db.createObjectStore(this.name, { keyPath: "id" });
    }
  }

  async createTransaction(mode?: IDBTransactionMode) {
    return (await indexDB.getDB()).transaction([this.name], mode);
  }

  async add(data: T) {
    console.log("add", data, "this.name", this.name);
    const transaction = await this.createTransaction("readwrite");

    console.log("objectStore", transaction.objectStore(this.name));

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
