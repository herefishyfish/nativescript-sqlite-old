import { Observable } from '@nativescript/core';

declare const __non_webpack_require__;

if (__ANDROID__) {
  try {
    __non_webpack_require__('system_lib://libsqlite.so');
  } catch (error) {
    console.error(`Failed to load libsqlite.so`);
  }
} else {
  try {
    SqliteInstaller.install();
  } catch (e) {
    if (__DEV__) {
      console.error('Failed to install sqlite plugin.');
    }
  }
}

export class SqliteCommon extends Observable {
  static open() {
    return Sqlite.open();
  }
}
