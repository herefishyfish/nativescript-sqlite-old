import { Component, NgZone } from '@angular/core';
import { DemoSharedSqliteCore } from '@demo/shared';
import {} from '@nativescript/sqlite';

@Component({
  selector: 'demo-sqlite',
  templateUrl: 'sqlite.component.html',
})
export class SqliteCoreComponent {
  demoShared: DemoSharedSqliteCore;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedSqliteCore();
  }
}
