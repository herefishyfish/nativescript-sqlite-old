declare const __non_webpack_require__, QuickSQLiteModule;
import { DemoSharedBase } from '../utils';
import { QuickSQLite, open } from '@nativescript/sqlite-quick';

export class DemoSharedSqliteQuick extends DemoSharedBase {
  db: QuickSQLite;

  testIt() {
    this.db = open({
      name: 'db.sqlite',
    });

    this.db.execute('DROP TABLE IF EXISTS User');
    this.db.execute('CREATE TABLE User ( id INT PRIMARY KEY, name TEXT NOT NULL ) STRICT;');
    this.db.execute('INSERT INTO "User" (id, name) VALUES(?, ?)', [1, 'poopski']);
    this.db.execute('INSERT INTO "User" (id, name) VALUES(?, ?)', [2, 'doodah']);
    this.db.execute('INSERT INTO "User" (id, name) VALUES(?, ?)', [3, 'floops']);
    this.db.execute('INSERT INTO "User" (id, name) VALUES(?, ?)', [4, 'boof']);
    const users = this.db.execute('SELECT * FROM User');

    console.log(users);
  }
}
