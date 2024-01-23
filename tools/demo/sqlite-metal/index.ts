import { Utils } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { SqliteMetal } from '@nativescript/sqlite-metal';
import { Chance } from 'chance';
const chance = new Chance();

declare const System: any;
const COUNT = 10000;
export class DemoSharedSqliteMetal extends DemoSharedBase {
  sqlite: SqliteMetal;

  constructor() {
    super();
    this.openDatabase();
  }

  async testIt() {
    console.log('test sqlite-metal!');

    // await this.benchmark(
    //   'divide c++',
    //   async () => {
    //     await (this.sqlite as any).divide(4, 2);
    //   },
    //   10000
    // );
    // await this.benchmark('divide js', () => 42, 10000);

    // console.log(4/2);
    // console.log((this.sqlite as any).divide(4, 2));

    // return;
    this.sqlite.execute('INSERT INTO test (name, age, cool, float, blob) VALUES (?, ?, ?, ?, ?);', ['Mary', 21, true, 2.1231333333, new ArrayBuffer(10)]);
    console.log(this.sqlite.execute('SELECT * FROM test'));
    console.log(await this.sqlite.executeAsync('SELECT * FROM test'));
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
    this.sqlite.execute('DROP TABLE IF EXISTS Benchmark');
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
    await this.benchmark(
      'inserts',
      () => {
        this.sqlite.execute('INSERT INTO test (name, age) VALUES ("Bob", 22);');
      },
      COUNT / 100
    );
    await this.benchmark(
      'delete',
      () => {
        this.sqlite.execute('DELETE FROM test WHERE name = "Bob";');
      },
      1
    );
    await this.benchmark('sync select with search', () => {
      this.sqlite.execute('SELECT * FROM `test` WHERE `name` = "Mary"');
    });
    await this.benchmark('sync selects', () => {
      this.sqlite.execute('SELECT * FROM `Benchmark`');
    });
  }

  async benchAsync() {
    // await this.benchmark('async inserts', async () => {
    //   await this.sqlite.executeAsync('INSERT INTO test (name, age) VALUES ("Bob", 22);');
    // }, COUNT / 100);
    // await this.benchmark('async delete', async () => {
    //   await this.sqlite.executeAsync('DELETE FROM test WHERE name = "Bob";');
    // }, 1);
    // await this.benchmark('async select with search', async () => {
    //   await this.sqlite.executeAsync('SELECT * FROM `test` WHERE `name` = "Mary"');
    // });
    // await this.benchmark('async selects', async () => {
    //   await this.sqlite.executeAsync('SELECT * FROM `Benchmark`');
    // }, 1);

    console.log('Starting bench');
    await this.bigBenchSetup();
    await this.benchmark(
      'async 300k',
      async () => {
        await this.sqlite.executeAsync('SELECT * FROM Test');
      },
      10
    );
    await this.benchmark(
      'sync 300k',
      async () => {
        await this.sqlite.execute('SELECT * FROM Test');
      },
      10
    );

    const res: any = await this.sqlite.execute('SELECT * FROM Test');
    console.log(res.rows.length);
  }

  async benchmark(label: string, operation: Function, count = COUNT) {
    const start = java.lang.System.nanoTime();
    for (let i = 0; i < count; i++) {
      await operation();
    }
    const end = java.lang.System.nanoTime();
    console.log(`${count} ${label} took ${(end - start) / 1000000.0}ms [${(end - start) / 1000000.0 / count}ms]`);
  }

  async bigBenchSetup() {
    this.sqlite.execute('DROP TABLE IF EXISTS Test;');
    this.sqlite.execute('CREATE TABLE Test ( id INT PRIMARY KEY, v1 TEXT, v2 TEXT, v3 TEXT, v4 TEXT, v5 TEXT, v6 INT, v7 INT, v8 INT, v9 INT, v10 INT, v11 REAL, v12 REAL, v13 REAL, v14 REAL) STRICT;');

    for (let i = 0; i < 300000; i++) {
      if (i % 100 === 0) {
        console.log(i);
      }

      await this.sqlite.executeAsync('INSERT INTO "Test" (id, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [i, chance.name(), chance.name(), chance.name(), chance.name(), chance.name(), chance.integer(), chance.integer(), chance.integer(), chance.integer(), chance.integer(), chance.floating(), chance.floating(), chance.floating(), chance.floating()]);
    }
  }

  async bigBench() {
    await this.sqlite.executeAsync('SELECT * FROM Test');
  }
}
