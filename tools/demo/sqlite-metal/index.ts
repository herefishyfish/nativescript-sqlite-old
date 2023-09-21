import { ApplicationSettings, Utils } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { NSCSQLite, SqliteMetal } from '@nativescript/sqlite-metal';

declare const System: any;
export class DemoSharedSqliteMetal extends DemoSharedBase {
  sqlite: SqliteMetal;

  constructor() {
    super();
    this.openDatabase();
  }

  // execute(s, p) {
  //   const cb: any = function (err, result) {
  //     return new Promise((resolve, reject) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve("result");
  //       }
  //     });
  //   };
  //   return this.sqlite.executeAsync(s, cb);
  // }

  async testIt() {
    console.log('test sqlite-metal!');
    // console.log('Insert Bob');
    // this.sqlite.execute('INSERT INTO test (name, age, blob, cool) VALUES ("Bob", 22, x\'10FFAA\', TRUE);');
    // // console.log(this.sqlite.execute('SELECT * FROM test;'));
    // console.log('Insert John');
    // const john = this.sqlite.execute('INSERT INTO test (name, age) VALUES (?, ?);', ['John', 25]);
    // console.log(john);
    // console.log('Insert Mary');

    // console.log(this.sqlite.executeAsync('INSERT INTO test (name, age) VALUES (?, ?);', ['Mary', 21]));

    this.sqlite.execute('CREATE TABLE IF NOT EXISTS Benchmark(value VARCHAR(30))');
    this.sqlite.execute('INSERT INTO Benchmark (value) VALUES (:value)', ['hello']);
    this.sqlite.execute('INSERT INTO Benchmark (value) VALUES (:value)', ['hello']);

    console.log(this.sqlite.execute('INSERT INTO test (name, age) VALUES (?, ?);', ['Mary', 21]));

    // console.log('Insert Mary');
    // const g = await this.sqlite.executeAsync('INSERT INTO test (name, age) VALUES (?, ?);', ['Mary', 21]);
    // console.log('g', g);
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
    this.sqlite.execute('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, cool BOOLEAN, blob BLOB);');
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
    const count = 1000;

    // bench 1 inserts
    // const start = java.lang.System.nanoTime();
    // for (let i = 0; i < count; i++) {
    //   this.sqlite.execute('INSERT INTO test (name, age) VALUES ("Bob", 22);');
    //   // this.sqlite.execute('INSERT INTO test (name, age) VALUES (?, ?);', ['Mary', 21]);
    // }
    // const end = java.lang.System.nanoTime();
    // console.log(`bench ${count} inserts took ` + (end - start) / 1000000.0 + 'ms');

    // bench 1 selects
    const start2 = java.lang.System.nanoTime();
    for (let i = 1; i < count + 1; i++) {
      this.sqlite.execute('SELECT * FROM `Benchmark`');
      // this.sqlite.execute('INSERT INTO Benchmark (value) VALUES (:value)', [
      //   'hello',
      // ]);
    }
    const end2 = java.lang.System.nanoTime();
    console.log(`bench ${count} sync call took ` + (end2 - start2) / 1000000.0 + 'ms');
    console.log(`bench average 1 sync call took ` + (end2 - start2) / 1000000.0 / count + 'ms');

    // let res = this.sqlite.execute('SELECT * FROM `Benchmark`');
    // console.log(JSON.stringify(res));

    const start3 = java.lang.System.nanoTime();
    for (let i = 1; i < count + 1; i++) {
      await this.sqlite.executeAsync('SELECT * FROM `Benchmark`');
      // await this.sqlite.executeAsync('INSERT INTO Benchmark (value) VALUES (:value)', [
      //   'hello',
      // ]);
    }
    const end3 = java.lang.System.nanoTime();
    console.log(`bench ${count} async calls took ` + (end3 - start3) / 1000000.0 + 'ms');
    console.log(`bench on average 1 async call took ` + (end3 - start3) / 1000000.0 / count + 'ms');
    // const result = await this.sqlite.executeAsync('SELECT * FROM `Benchmark`');
    // console.log(JSON.stringify(result));
  }
}
