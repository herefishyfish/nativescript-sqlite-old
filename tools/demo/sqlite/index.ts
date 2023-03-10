import { DemoSharedBase } from '../utils';
import {} from '@nativescript/sqlite';

export class DemoSharedSqliteCore extends DemoSharedBase {
  testIt() {
    console.log('test sqlite!');
    this.database();
  }
}
