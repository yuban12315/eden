const DataBaseName = "EdenCollection";

class IDB {
  private version?: number;
  private idb?: IDBDatabase;
  private open?: boolean;
  private collections: string[];

  constructor() {
    this.collections = [];

    // init
    // this.openDB();
  }

  async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.idb) {
        this.idb.close();
      }
      const req = indexedDB.open(DataBaseName, this.version);

      req.onsuccess = () => {
        // https://github.com/microsoft/TypeScript/issues/28293
        const db = req.result;

        this.idb = db;
        this.open = true;
        this.version = db.version;

        resolve(db);
      };

      req.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const idb = req.result;
        for (const collection of this.collections) {
          if (!idb.objectStoreNames.contains(collection)) {
            idb.createObjectStore(collection, { keyPath: "id" });
          }
        }
      };

      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  async registerCollection(name: string) {
    if (!this.idb?.objectStoreNames.contains(name)) {
      this.collections.push(name);
    }
  }

  async upgradeAndGetDB() {
    this.version!++;
    // wait ontill db opened
    return await this.openDB();
  }

  async getDBWithObjectStore(storeNames: string) {
    if (!this.idb) {
      return await this.openDB();
    } else if (
      this.version &&
      !this.idb.objectStoreNames.contains(storeNames)
    ) {
      this.version++;
      return await this.openDB();
    } else {
      return this.idb!;
    }
  }

  // current stage only support single store
  async createTransaction(storeNames: string, mode?: IDBTransactionMode) {
    // create objectStore if is not created
    const idb = await this.getDBWithObjectStore(storeNames);

    return idb.transaction(storeNames, mode);
  }
}

export default new IDB();
