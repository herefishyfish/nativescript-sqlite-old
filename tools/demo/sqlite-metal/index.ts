import { Utils } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { NSCSQLite } from '@nativescript/sqlite-metal';

declare const System: any;
export class DemoSharedSqliteMetal extends DemoSharedBase {
  sqlite: NSCSQLite;

  constructor() {
    super();
    this.openDatabase();
  }

  testIt() {
    console.log('test sqlite-metal!');
    console.log('Insert Bob');
    this.sqlite.execute('INSERT INTO test (name, age) VALUES ("Bob", 22);');
    // console.log(this.sqlite.execute('SELECT * FROM test;'));
    console.log('Insert John');
    this.sqlite.execute('INSERT INTO test (name, age) VALUES (?, ?);', ['John', 25]);
    console.log('Insert Mary');
    this.sqlite.execute('INSERT INTO test (name, age) VALUES (?, ?);', ['Mary', 21]);

    const rows = this.sqlite.execute('SELECT * FROM test;');
    console.log(rows);
  }

  openDatabase() {
    console.log('openDatabase');
    const dbPath = Utils.android.getApplicationContext().getFilesDir().getAbsolutePath() + '/db.sqlite';
    console.log(dbPath);
    this.sqlite = new NSCSQLite(dbPath);
    console.dir(this.sqlite);
    console.log('Create table');
    this.sqlite.execute('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);');
  }

  closeDatabase() {
    console.log('closeDatabase');
    this.sqlite.close();
  }

  deleteDatabase() {
    console.log('deleteDatabase');
    this.sqlite.delete();
  }

  benchIt() {
    const count = 100;

    // bench 1 inserts
    const start = java.lang.System.nanoTime();
    for (let i = 0; i < count; i++) {
      this.sqlite.execute('INSERT INTO test (name, age) VALUES ("Bob", 22);');
      // this.sqlite.execute('INSERT INTO test (name, age) VALUES (?, ?);', ['Mary', 21]);
    }
    const end = java.lang.System.nanoTime();
    console.log(`bench ${count} inserts took ` + (end - start) / 1000000.0 + 'ms');

    // bench 1 selects
    const start2 = java.lang.System.nanoTime();
    for (let i = 1; i < count + 1; i++) {
      this.sqlite.execute(`SELECT * FROM test WHERE id = ${i};`);
    }
    const end2 = java.lang.System.nanoTime();
    console.log(`bench ${count} selects took ` + (end2 - start2) / 1000000.0 + 'ms');
  }
}
