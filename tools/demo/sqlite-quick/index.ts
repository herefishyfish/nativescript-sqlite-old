declare const __non_webpack_require__, QuickSQLiteModule;
import { DemoSharedBase } from '../utils';
import { QuickSQLite, open } from '@nativescript/sqlite-quick';

export class DemoSharedSqliteQuick extends DemoSharedBase {
  db: QuickSQLite;

  constructor() {
    super();
    this.db = open({
      name: 'test',
    });
  }

  testIt() {
    let result = this.db.execute('DROP TABLE IF EXISTS Benchmark', []);
    if (result.status) {
      console.error('SQLite: Failed to create table!', result);
    }

    this.db.execute('CREATE TABLE IF NOT EXISTS Benchmark(value VARCHAR(30))', []);
    this.db.execute('INSERT INTO Benchmark (value) VALUES (:value)', ['hello']);

    this.runBenchmark();
    this.addUsers();
  }

  addUsers() {
    this.db.execute('DROP TABLE IF EXISTS User');
    this.db.execute('CREATE TABLE User ( id INT PRIMARY KEY, name TEXT NOT NULL ) STRICT;');
    console.time('ios');
    this.db.execute('INSERT INTO "User" (id, name) VALUES(?, ?)', [1, 'poopski']);
    this.db.execute('INSERT INTO "User" (id, name) VALUES(?, ?)', [2, 'doodah']);
    this.db.execute('INSERT INTO "User" (id, name) VALUES(?, ?)', [3, 'floops']);
    this.db.execute('INSERT INTO "User" (id, name) VALUES(?, ?)', [4, 'boof']);
    console.timeEnd('ios');

    const users = this.db.execute('SELECT * FROM User');

    // console.log(users);
  }

  getFromSQLite(): string | undefined {
    let { status, rows } = this.db.execute('SELECT * FROM `Benchmark`', []);
    if (rows == null || rows.length < 1) {
      console.error(`Failed to get Values! ${JSON.stringify(status)}`);
    }

    // const row = rows.item(0);
    return rows;
  }

  runBenchmark() {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      const r = this.getFromSQLite();
    }
    const end = performance.now();
    const diff = end - start;
    console.log(`Finished Benchmark! Took ${diff.toFixed(4)}ms!`);
  }
}
