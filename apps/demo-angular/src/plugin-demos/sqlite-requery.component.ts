import { Component, NgZone } from '@angular/core';
import { DemoSharedSqliteRequery } from '@demo/shared';
import {} from '@nativescript/sqlite-requery';

@Component({
  selector: 'demo-sqlite-requery',
  templateUrl: 'sqlite-requery.component.html',
})
export class SqliteRequeryComponent {
  demoShared: DemoSharedSqliteRequery;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedSqliteRequery();
  }
}
