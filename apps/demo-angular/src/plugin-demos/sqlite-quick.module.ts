import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SqliteQuickComponent } from './sqlite-quick.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: SqliteQuickComponent }])],
  declarations: [SqliteQuickComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SqliteQuickModule {}
