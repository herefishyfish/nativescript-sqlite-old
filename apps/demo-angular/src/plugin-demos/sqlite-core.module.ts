import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SqliteCoreComponent } from './sqlite.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: SqliteCoreComponent }])],
  declarations: [SqliteCoreComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SqliteCoreModule {}
