import { Application } from '@nativescript/core';
import { installSQLiteRequeryDriver } from '@nativescript/sqlite-requery';

installSQLiteRequeryDriver();

Application.run({ moduleName: 'app-root' });
