import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedSqliteMetal } from '@demo/shared';
import {} from '@nativescript/sqlite-metal';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedSqliteMetal {}
