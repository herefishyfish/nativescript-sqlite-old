import { AbstractSQLiteDatabase, applyMixins } from '@nativescript/sqlite';

let mixinInstalled = false;

export function installSQLiteCipherDriver(): void {
  if (!mixinInstalled) {
    mixinInstalled = true;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const driver = require('@nativescript/sqlite').SQLiteDatabase;
    applyMixins(driver, [SqliteCipherDriver], { override: true });
  }
}

export class SqliteCipherDriver extends AbstractSQLiteDatabase<any> {
  open(path: string): Promise<void> {
    throw new Error('sqlcipher: Method not implemented.');
  }
  close(): Promise<void> {
    throw new Error('sqlcipher: Method not implemented.');
  }
  // execute(query: string, params?: any[]): Promise<any> {
  //   throw new Error('sqlcipher: Method not implemented.');
  // }
}
