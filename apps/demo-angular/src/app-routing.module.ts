import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sqlite', loadChildren: () => import('./plugin-demos/sqlite.module').then((m) => m.SqliteCoreModule) },
  { path: 'sqlite-requery', loadChildren: () => import('./plugin-demos/sqlite-requery.module').then((m) => m.SqliteRequeryModule) },
  { path: 'sqlite-sqlcipher', loadChildren: () => import('./plugin-demos/sqlite-sqlcipher.module').then((m) => m.SqliteSqlcipherModule) },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
