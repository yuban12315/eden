const DataBaseName = "EdenCollection";

class IDB {
  private _version?: number;
  private _idb?: IDBDatabase;
  private _open?: boolean;
  private _collections: string[];

  constructor() {
    this._collections = [];
  }

  private async _openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this._idb) {
        this._idb.close();
      }
      const req = indexedDB.open(DataBaseName, this._version);

      req.onsuccess = () => {
        // https://github.com/microsoft/TypeScript/issues/28293
        const db = req.result;

        this._idb = db;
        this._open = true;
        this._version = db.version;

        resolve(db);
      };

      req.onupgradeneeded = () => {
        const idb = req.result;

        for (const collection of this._collections) {
          if (!idb.objectStoreNames.contains(collection)) {
            idb
              .createObjectStore(collection, { keyPath: "id" })
              .createIndex("id", "id", { unique: true });
          }
        }
      };

      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  async registerCollection(name: string) {
    if (!this._idb?.objectStoreNames.contains(name)) {
      this._collections.push(name);
    }
  }

  async upgradeAndGetDB() {
    this._version!++;
    // wait ontill db opened
    return await this._openDB();
  }

  async getDBWithObjectStore(storeNames: string) {
    if (!this._idb) {
      // create targe objectStore
      return await this._openDB();
    } else if (
      this._version &&
      !this._idb.objectStoreNames.contains(storeNames)
    ) {
      // upgrade db version to create targe objectStore
      this._version++;
      return await this._openDB();
    } else {
      // use current db
      return this._idb;
    }
  }

  // current stage only support single store
  async createTransaction(storeNames: string, mode?: IDBTransactionMode) {
    // create objectStore if is not created
    const idb = await this.getDBWithObjectStore(storeNames);

    return idb.transaction(storeNames, mode);
  }
}

const idb = new IDB();
export { idb };
