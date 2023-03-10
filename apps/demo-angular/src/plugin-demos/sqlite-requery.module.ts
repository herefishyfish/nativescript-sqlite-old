import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SqliteRequeryComponent } from './sqlite-requery.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: SqliteRequeryComponent }])],
  declarations: [SqliteRequeryComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SqliteRequeryModule {}
