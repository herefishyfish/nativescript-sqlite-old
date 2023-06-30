import { DemoSharedBase } from '../utils';
import { NSCSQLite } from '@nativescript/sqlite-metal';

export class DemoSharedSqliteMetal extends DemoSharedBase {
  sqlite: any;

  testIt() {
    console.log('test sqlite-metal!');
    this.sqlite = new NSCSQLite('db.sqlite');
    console.dir(this.sqlite);
    // sqlite.open('db.sqlite');
    const g = this.sqlite.execute();
    console.log('g', g);
  }
}
