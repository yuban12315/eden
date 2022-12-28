const DataBaseName = "EdenCollection";

class IndexDB {
  private version?: number;
  private idb?: IDBDatabase;
  private open?: boolean;

  constructor() {}

  async getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (!this.idb) {
        let req: IDBOpenDBRequest;
        if (this.version) {
          req = indexedDB.open(DataBaseName, this.version);
        } else {
          req = indexedDB.open(DataBaseName);
        }

        req.onsuccess = () => {
          // https://github.com/microsoft/TypeScript/issues/28293
          const db = req.result;

          this.idb = db;
          this.open = true;

          resolve(db);
        };

        req.onerror = () => {
          reject(req.error);
        };
      } else {
        resolve(this.idb);
      }
    });
  }

  async getConnection() {}
}

export default new IndexDB();
