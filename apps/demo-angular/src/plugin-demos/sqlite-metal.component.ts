import { Component, NgZone } from '@angular/core';
import { DemoSharedSqliteMetal } from '@demo/shared';
import {} from '@nativescript/sqlite-metal';

@Component({
  selector: 'demo-sqlite-metal',
  templateUrl: 'sqlite-metal.component.html',
})
export class SqliteMetalComponent {
  demoShared: DemoSharedSqliteMetal;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedSqliteMetal();
  }
}
