import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SqliteComponent } from './sqlite.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: SqliteComponent }])],
  declarations: [SqliteComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SqliteModule {}
