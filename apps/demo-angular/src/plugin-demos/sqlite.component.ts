import { Component, NgZone } from '@angular/core';
import { DemoSharedSqlite } from '@demo/shared';
import {} from '@nativescript/sqlite';

@Component({
  selector: 'demo-sqlite',
  templateUrl: 'sqlite.component.html',
})
export class SqliteComponent {
  demoShared: DemoSharedSqlite;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedSqlite();
  }
}
