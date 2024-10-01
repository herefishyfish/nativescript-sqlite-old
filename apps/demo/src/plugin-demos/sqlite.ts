import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedSqlite } from '@demo/shared';
import {} from '@nativescript/sqlite';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedSqlite {
  open() {
    console.log('open');
    console.log(global.Sqlite3.sqlite3_open());
  }
}
