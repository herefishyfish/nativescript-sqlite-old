import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedSqliteCore } from '@demo/shared';
import {} from '@nativescript/sqlite';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedSqliteCore {}
