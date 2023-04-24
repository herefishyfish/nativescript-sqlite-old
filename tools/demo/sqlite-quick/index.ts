declare const __non_webpack_require__, QuickSQLiteModule;
import { DemoSharedBase } from '../utils';
import {} from '@nativescript/sqlite-quick';

export class DemoSharedSqliteQuick extends DemoSharedBase {
  db;

  testIt() {
    console.log('test sqlite-quick!');

    if (!global.QuickSQLiteImpl) {
      const module = new global.QuickSQLiteModule();
      console.log(module.install());
      console.log('creating module');
    }
    global.QuickSQLiteImpl.open('db2.sqlite');
    console.log('maybe it did a thing?', this.db);
  }

  addTable() {
    global.QuickSQLiteImpl.execute('DROP TABLE IF EXISTS User;');
    global.QuickSQLiteImpl.execute('CREATE TABLE User ( id INT PRIMARY KEY, name TEXT NOT NULL, age INT, networth REAL) STRICT;');
  }

  addRow() {
    const id = 1;
    const name = 'Test';
    const age = 22;
    const networth = 123.0001;
    const res = this.db.execute('INSERT INTO "User" (id, name, age, networth) VALUES(?, ?, ?, ?)', [id, name, age, networth]);
    console.log(res);
  }

  getRows() {
    const id = Math.round(Math.random() * 100);
    const name = 'chance.name()';
    const age = Math.round(Math.random() * 100);
    const networth = Math.random() * 10000;
    const res = this.db.execute('INSERT INTO "User" (id, name, age, networth) VALUES(?, ?, ?, ?)', [id, name, age, networth]);

    console.log(res);
  }
}
