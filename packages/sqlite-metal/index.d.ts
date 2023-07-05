import { SqliteMetalCommon } from './common';

export type QueryResult = {
  insertId?: number;
  rowsAffected: number;
  rows?: any[];
  // rows?: {
  //   _array: any[];
  //   length: number;
  // };
};

export declare class NSCSQLite {
  constructor(path: string);

  execute(query: string, params?: any[]): any[];
  attach(alias: string, path: string): void;
  detach(alias: string): void;
  close(): void;
  delete(): void;
}

export declare class SqliteMetal extends SqliteMetalCommon {}
