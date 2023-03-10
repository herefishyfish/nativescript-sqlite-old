import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedSqliteRequery } from '@demo/shared';
import {} from '@nativescript/sqlite-requery';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedSqliteRequery {}
