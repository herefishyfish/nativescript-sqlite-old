import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedSqliteQuick } from '@demo/shared';
import {} from '@nativescript/sqlite-quick';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedSqliteQuick {}
