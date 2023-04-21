import { Component, NgZone } from '@angular/core';
import { DemoSharedSqliteQuick } from '@demo/shared';
import {} from '@nativescript/sqlite-quick';

@Component({
  selector: 'demo-sqlite-quick',
  templateUrl: 'sqlite-quick.component.html',
})
export class SqliteQuickComponent {
  demoShared: DemoSharedSqliteQuick;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedSqliteQuick();
  }
}
