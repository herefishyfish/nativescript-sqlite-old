import { Utils } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { NSCSQLite } from '@nativescript/sqlite-metal';

export class DemoSharedSqliteMetal extends DemoSharedBase {
  sqlite: NSCSQLite;

  testIt() {
    console.log('test sqlite-metal!');
    const dbPath = Utils.android.getApplicationContext().getFilesDir().getAbsolutePath() + '/db.sqlite';
    console.log(dbPath);
    this.sqlite = new NSCSQLite(dbPath);
    console.dir(this.sqlite);
    console.log('Create table');
    this.sqlite.execute('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);');
    console.log('Insert John');
    this.sqlite.execute('INSERT INTO test (name, age) VALUES (?, ?);', ['John', 25]);
    console.log('Insert Mary');
    this.sqlite.execute('INSERT INTO test (name, age) VALUES (?, ?);', ['Mary', 21]);

    const rows = this.sqlite.execute('SELECT * FROM test;');
    console.log(rows);
  }
}
