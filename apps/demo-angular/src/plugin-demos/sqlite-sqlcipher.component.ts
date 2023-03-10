import { Component, NgZone } from '@angular/core';
import { DemoSharedSqliteSqlcipher } from '@demo/shared';
import {} from '@nativescript/sqlite-sqlcipher';

@Component({
  selector: 'demo-sqlite-sqlcipher',
  templateUrl: 'sqlite-sqlcipher.component.html',
})
export class SqliteSqlcipherComponent {
  demoShared: DemoSharedSqliteSqlcipher;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedSqliteSqlcipher();
  }
}
