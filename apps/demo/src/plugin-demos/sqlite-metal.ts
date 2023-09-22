import { EventData, Page, LoadEventData, StackLayout, CoreTypes } from '@nativescript/core';
import { DemoSharedSqliteMetal } from '@demo/shared';
import {} from '@nativescript/sqlite-metal';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

async function animateView(view) {
  await view.animate({
    rotate: 360,
    duration: 2000,
    curve: CoreTypes.AnimationCurve.linear,
  });

  view.rotate = 0;

  animateView(view);
}
export class DemoModel extends DemoSharedSqliteMetal {
  onLoaded(args: LoadEventData) {
    const view = args.object as StackLayout;
    animateView(view);
  }
}
