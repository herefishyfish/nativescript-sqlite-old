import { AbstractSQLiteDatabase, applyMixins } from '@nativescript/sqlite';

let mixinInstalled = false;

export function installSQLiteRequeryDriver(): void {
  if (!mixinInstalled) {
    mixinInstalled = true;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const driver = require('@nativescript/sqlite').SQLiteDatabase;
    applyMixins(driver, [SqliteRequeryDriver], { override: true });
  }
}

export class SqliteRequeryDriver extends AbstractSQLiteDatabase<any> {
  open(path: string): Promise<void> {
    console.log('REQUERY: Method not implemented.');
    return;
  }
  close(): Promise<void> {
    console.log('REQUERY: Method not implemented.');
    return;
  }
  // execute(query: string, params?: any[]): Promise<any> {
  //   console.log('REQUERY: Method not implemented.');
  //   return;
  // }
}
