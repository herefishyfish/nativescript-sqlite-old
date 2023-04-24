declare const __non_webpack_require__, QuickSQLiteModule;
import { DemoSharedBase } from '../utils';
import {} from '@nativescript/sqlite-quick';

export class DemoSharedSqliteQuick extends DemoSharedBase {
  testIt() {
    console.log('test sqlite-quick!');

    if (!global.QuickSQLiteImpl) {
      const module = new global.QuickSQLiteModule();
      console.log(module.install());
      console.log('creating module');
    }
    global.QuickSQLiteImpl.open('db.sqlite');
    console.log('maybe it did a thing');
  }
}
