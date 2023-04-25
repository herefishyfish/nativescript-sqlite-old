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
    global.QuickSQLiteImpl.execute('db2.sqlite', 'DROP TABLE IF EXISTS User;');
    global.QuickSQLiteImpl.execute('db2.sqlite', 'CREATE TABLE User ( id INT PRIMARY KEY, name TEXT NOT NULL, age INT, networth REAL) STRICT;');
  }

  addRow() {
    const id = 1;
    const name = 'Test';
    const age = 22;
    const networth = 123.0001;
    const res = global.QuickSQLiteImpl.execute('db2.sqlite', 'INSERT INTO "User" (id, name, age, networth) VALUES(?, ?, ?, ?)', [id, name, age, networth]);
    console.log(res);
  }

  getRows() {
    const id = Math.round(Math.random() * 100);
    const name = 'User';
    const age = Math.round(Math.random() * 100);
    const networth = Math.random() * 10000;
    global.QuickSQLiteImpl.execute('db2.sqlite', 'INSERT INTO "User" (id, name, age, networth) VALUES(?, ?, ?, ?)', [id, name, age, networth]);

    const users = global.QuickSQLiteImpl.execute('db2.sqlite', 'SELECT * FROM User');
    console.log('users', users);
  }
}
