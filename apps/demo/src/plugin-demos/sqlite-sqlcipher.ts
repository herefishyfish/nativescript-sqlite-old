import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedSqliteSqlcipher } from '@demo/shared';
import {} from '@nativescript/sqlite-sqlcipher';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedSqliteSqlcipher {}
