import { SqliteMetalCommon } from './common';

export declare class NSCSQLite {
  constructor(path: string);

  execute(query: string, params?: any[]): any[];
}

export declare class SqliteMetal extends SqliteMetalCommon {}
