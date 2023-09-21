declare const __non_webpack_require__;
import { Utils } from '@nativescript/core';
import { SqliteMetalCommon } from './common';

try {
  java.lang.System.loadLibrary('sqlitemetal');
} catch (error) {
  console.log(error);
}

__non_webpack_require__(`${(Utils.android.getApplicationContext() as android.content.Context).getApplicationInfo().nativeLibraryDir}/libsqlitemetal.so`);

const open = global.NSCSQLite.open;
global.NSCSQLite.open = function (path) {
  console.log('open', path);
  if (typeof path === 'string') {
    open(path);
  } else {
    const root = Utils.android.getApplicationContext().getFilesDir().getAbsolutePath() + '/sqlite';
    open(root);
  }
};

const executeAsync = global.NSCSQLite.executeAsync;

global.NSCSQLite.executeAsync = function (query: string, params?: any[]): Promise<any[]> {
  console.log('?');
  // callback function to promise function
  const cb = function (err, result) {
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  };
  return executeAsync('ok', cb);
};

export const NSCSQLite = global.NSCSQLite;

export class SqliteMetal extends SqliteMetalCommon {}
