import { ApplicationSettings, Utils } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { NSCSQLite, SqliteMetal } from '@nativescript/sqlite-metal';

declare const System: any;
const COUNT = 1000;
export class DemoSharedSqliteMetal extends DemoSharedBase {
  sqlite: SqliteMetal;

  constructor() {
    super();
    this.openDatabase();
  }

  async testIt() {
    console.log('test sqlite-metal!');

    this.sqlite.execute('INSERT INTO test (name, age, cool, float, blob) VALUES (?, ?, ?, ?, ?);', ['Mary', 21, true, 2.1231333333, new ArrayBuffer(10)]);
    console.log(this.sqlite.execute('SELECT * FROM test'));
  }

  openDatabase() {
    if (this.sqlite) {
      this.sqlite.close();
    }

    console.log('openDatabase');
    const dbPath = Utils.android.getApplicationContext().getFilesDir().getAbsolutePath() + '/db.sqlite';
    console.log(dbPath);
    this.sqlite = new SqliteMetal(dbPath);
    console.dir(this.sqlite);
    console.log('Create table');
    this.sqlite.execute('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, cool BOOLEAN, blob BLOB, float FLOAT);');
    this.sqlite.execute('CREATE TABLE IF NOT EXISTS Benchmark(value VARCHAR(30))');
    this.sqlite.execute('INSERT INTO Benchmark (value) VALUES (:value)', ['hello']);
  }

  closeDatabase() {
    console.log('closeDatabase');
    this.sqlite.close();
  }

  deleteDatabase() {
    console.log('deleteDatabase');
    this.sqlite.delete();
  }

  async benchIt() {
    await this.benchmark('inserts', () => {
      this.sqlite.execute('INSERT INTO test (name, age) VALUES ("Bob", 22);');
    });
    await this.benchmark('delete', () => {
      this.sqlite.execute('DELETE FROM test WHERE name = "Bob";');
    });
    await this.benchmark('async inserts', async () => {
      await this.sqlite.executeAsync('INSERT INTO test (name, age) VALUES ("Bob", 22);');
    });
    await this.benchmark('async delete', async () => {
      await this.sqlite.executeAsync('DELETE FROM test WHERE name = "Bob";');
    });
    await this.benchmark('sync select with search', () => {
      this.sqlite.execute('SELECT * FROM `test` WHERE `name` = "Bob"');
    });
    await this.benchmark('async select with search', async () => {
      await this.sqlite.executeAsync('SELECT * FROM `test` WHERE `name` = "Bob"');
    });
    await this.benchmark('sync selects', () => {
      this.sqlite.execute('SELECT * FROM `Benchmark`');
    });
    await this.benchmark('async selects', async () => {
      await this.sqlite.executeAsync('SELECT * FROM `Benchmark`');
    });

    const result: any = await this.sqlite.executeAsync('SELECT * FROM `Benchmark`');
    console.log(result.rows.length);
    console.log(JSON.stringify(result));
  }

  async benchmark(label: string, operation: Function) {
    const start = java.lang.System.nanoTime();
    for (let i = 0; i < COUNT; i++) {
      await operation();
    }
    const end = java.lang.System.nanoTime();
    console.log(`${COUNT} ${label} took ${(end - start) / 1000000.0}ms`);
    console.log(`${COUNT} ${label} on average took ${(end - start) / 1000000.0 / COUNT}ms`);
  }
}
