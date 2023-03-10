import { ISQLiteDatabase, SqliteRow } from './common';
export { applyMixins } from './utils';

export abstract class AbstractSQLiteDatabase implements ISQLiteDatabase {
  isOpen: boolean;

  open(path: string): Promise<void> {
    console.log('DEFAULT: Method not implemented.');
    return;
  }
  getVersion(): Promise<number> {
    console.log('DEFAULT: Method not implemented.');
    return;
  }
  setVersion(version: number): Promise<void> {
    console.log('DEFAULT: Method not implemented.');
    return;
  }
  close(): Promise<void> {
    console.log('DEFAULT: Method not implemented.');
    return;
  }
  select(query: string, params?: any): Promise<SqliteRow[]> {
    console.log('DEFAULT: Method not implemented.');
    return;
  }
  selectArray(query: string, params?: any): Promise<any[][]> {
    console.log('DEFAULT: Method not implemented.');
    return;
  }
  get(query: string, params?: any): Promise<SqliteRow> {
    console.log('DEFAULT: Method not implemented.');
    return;
  }
  getArray(query: string, params?: any): Promise<any[]> {
    console.log('DEFAULT: Method not implemented.');
    return;
  }
  execute(query: string, params?: any): Promise<void> {
    console.log('DEFAULT: Method not implemented.');
    return;
  }
  transaction<T = any>(action: (cancel?: () => void) => Promise<T>): Promise<T> {
    console.log('DEFAULT: Method not implemented.');
    return;
  }
  each(query: string, params: any, callback: (error: Error, result: SqliteRow) => void, complete: (error: Error, count: number) => void): Promise<void> {
    console.log('DEFAULT: Method not implemented.');
    return;
  }
}

export class SQLiteDatabase extends AbstractSQLiteDatabase {}
