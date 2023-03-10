import { Observable } from '@nativescript/core';
import { SQLiteDatabase } from '@nativescript/sqlite';

export class DemoSharedBase extends Observable {
  database() {
    const db = new SQLiteDatabase() as any;
    db.open('test.db');

    db.execute('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
  }

  // in case you want to globally control how your shared demo code works across whole workspace
}
