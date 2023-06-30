declare const __non_webpack_require__;
import { Utils } from '@nativescript/core';

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

export const NSCSQLite = global.NSCSQLite;
