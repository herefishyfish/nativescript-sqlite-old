import { SqliteMetalCommon } from './common';

export declare class NSCSQLite {
  constructor(path: string) {}
  open(path: string): number;
}

export declare class SqliteMetal extends SqliteMetalCommon {}
