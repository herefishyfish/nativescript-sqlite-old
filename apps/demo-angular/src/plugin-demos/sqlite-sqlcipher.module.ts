import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SqliteSqlcipherComponent } from './sqlite-sqlcipher.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: SqliteSqlcipherComponent }])],
  declarations: [SqliteSqlcipherComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SqliteSqlcipherModule {}
