export declare type SqliteParam = null | number | string | ArrayBuffer | any;
export declare type SqliteParams = SqliteParam | SqliteParam[];
export interface SqliteRow {
  [name: string]: SqliteParam;
}
export declare type Db = any;
export declare type SqliteUpgrade = (db: Db) => void;

export interface ISQLiteDatabase {
  open(path: string): Promise<void>;
  getVersion(): Promise<number>;
  setVersion(version: number): Promise<void>;
  isOpen: boolean;
  close(): Promise<void>;
  select(query: string, params?: SqliteParams): Promise<SqliteRow[]>;
  selectArray(query: string, params?: SqliteParams): Promise<SqliteParam[][]>;
  get(query: string, params?: SqliteParams): Promise<SqliteRow>;
  getArray(query: string, params?: SqliteParams): Promise<SqliteParam[]>;
  execute(query: string, params?: SqliteParams): Promise<void>;
  transaction<T = any>(action: (cancel?: () => void) => Promise<T>): Promise<T>;
  each(query: string, params: SqliteParams, callback: (error: Error, result: SqliteRow) => void, complete: (error: Error, count: number) => void): Promise<void>;
}
