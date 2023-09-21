import { version } from 'yargs';
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
  executeAsync(query: string, params?: any[], callback: (error: string | null, result?: string) => void): Promise<any[]>;
  // executeAsync(query: string, params?: any[]): Promise<any[]>;
  attach(alias: string, path: string): void;
  detach(alias: string): void;
  close(): void;
  delete(): void;
}

export declare class SqliteMetal extends SqliteMetalCommon {
  #native: NSCSQLite;
  constructor(path);
  executeAsync<T = any>(query: string, params?: any[]): Promise<T[]>;
  execute<T = any>(query: string, params?: any[]): T[];
  attach(alias: string, path: string): void;
  detach(alias: string): void;
  close(): void;
  delete(): void;
}

export interface SqliteOpenOptions {
  name: string;
  path: string;
  version: number;
  multithreaded: boolean;
  readOnly: boolean;
}
export declare class SqliteMetal {
  isOpen: boolean;
  constructor(options: SqliteOpenOptions);

  execute<T = any>(query: string, params?: any[]): T[];
  execute(query: string[], params?: any[][]): any;
  transaction<T = any>(action: (cancel?: () => void) => Promise<T>): Promise<T>;
  attach(alias: string, path: string): void;
  detach(alias: string): void;
  close(): void;
  delete(): void;
}
