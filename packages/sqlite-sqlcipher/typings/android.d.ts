/// <reference path="android-declarations.d.ts"/>

declare module net {
  export module sqlcipher {
    export abstract class AbstractCursor extends net.sqlcipher.Cursor {
      public static class: java.lang.Class<net.sqlcipher.AbstractCursor>;
      public mUpdatedRows: java.util.HashMap<java.lang.Long, java.util.Map<string, any>>;
      public mRowIdColumnIndex: number;
      public mPos: number;
      public mCurrentRowID: java.lang.Long;
      public mContentResolver: globalAndroid.content.ContentResolver;
      public mClosed: boolean;
      public unregisterDataSetObserver(param0: globalAndroid.database.DataSetObserver): void;
      public registerDataSetObserver(param0: globalAndroid.database.DataSetObserver): void;
      public getFloat(param0: number): number;
      public requery(): boolean;
      public copyStringToBuffer(param0: number, param1: globalAndroid.database.CharArrayBuffer): void;
      public isAfterLast(): boolean;
      public getBlob(param0: number): androidNative.Array<number>;
      public getColumnIndexOrThrow(param0: string): number;
      public onMove(param0: number, param1: number): boolean;
      public getCount(): number;
      public getShort(param0: number): number;
      public getType(param0: number): number;
      /** @deprecated */
      public commitUpdates(): boolean;
      /** @deprecated */
      public abortUpdates(): void;
      /** @deprecated */
      public updateShort(param0: number, param1: number): boolean;
      public isNull(param0: number): boolean;
      public getDouble(param0: number): number;
      public getColumnName(param0: number): string;
      public getString(param0: number): string;
      public deactivate(): void;
      /** @deprecated */
      public updateInt(param0: number, param1: number): boolean;
      public constructor();
      /** @deprecated */
      public updateBlob(param0: number, param1: androidNative.Array<number>): boolean;
      public move(param0: number): boolean;
      public notifyDataSetChange(): void;
      public setExtras(param0: globalAndroid.os.Bundle): void;
      public getDataSetObservable(): globalAndroid.database.DataSetObservable;
      /** @deprecated */
      public hasUpdates(): boolean;
      public getColumnIndex(param0: string): number;
      public moveToPrevious(): boolean;
      public getInt(param0: number): number;
      public getWantsAllOnMoveCalls(): boolean;
      public isClosed(): boolean;
      public onChange(param0: boolean): void;
      public setNotificationUri(param0: globalAndroid.content.ContentResolver, param1: globalAndroid.net.Uri): void;
      public getUpdatedField(param0: number): any;
      public respond(param0: globalAndroid.os.Bundle): globalAndroid.os.Bundle;
      public getPosition(): number;
      public registerContentObserver(param0: globalAndroid.database.ContentObserver): void;
      public isBeforeFirst(): boolean;
      public moveToFirst(): boolean;
      public isFieldUpdated(param0: number): boolean;
      /** @deprecated */
      public updateString(param0: number, param1: string): boolean;
      public fillWindow(param0: number, param1: globalAndroid.database.CursorWindow): void;
      public getColumnNames(): androidNative.Array<string>;
      public isLast(): boolean;
      public close(): void;
      public moveToNext(): boolean;
      /** @deprecated */
      public update(param0: number, param1: any): boolean;
      public finalize(): void;
      public moveToLast(): boolean;
      public getColumnCount(): number;
      public checkPosition(): void;
      /** @deprecated */
      public commitUpdates(param0: java.util.Map<any, any>): boolean;
      public isFirst(): boolean;
      /** @deprecated */
      public deleteRow(): boolean;
      public deactivateInternal(): void;
      /** @deprecated */
      public updateLong(param0: number, param1: number): boolean;
      public moveToPosition(param0: number): boolean;
      public getLong(param0: number): number;
      /** @deprecated */
      public updateFloat(param0: number, param1: number): boolean;
      public getWindow(): net.sqlcipher.CursorWindow;
      /** @deprecated */
      public updateDouble(param0: number, param1: number): boolean;
      /** @deprecated */
      public updateToNull(param0: number): boolean;
      public getExtras(): globalAndroid.os.Bundle;
      /** @deprecated */
      public supportsUpdates(): boolean;
      public unregisterContentObserver(param0: globalAndroid.database.ContentObserver): void;
      public getNotificationUri(): globalAndroid.net.Uri;
    }
    export module AbstractCursor {
      export class SelfContentObserver {
        public static class: java.lang.Class<net.sqlcipher.AbstractCursor.SelfContentObserver>;
        public deliverSelfNotifications(): boolean;
        public onChange(param0: boolean): void;
        public constructor(param0: net.sqlcipher.AbstractCursor);
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export abstract class AbstractWindowedCursor extends net.sqlcipher.AbstractCursor {
      public static class: java.lang.Class<net.sqlcipher.AbstractWindowedCursor>;
      public mWindow: net.sqlcipher.CursorWindow;
      public isNull(param0: number): boolean;
      public checkPosition(): void;
      public getDouble(param0: number): number;
      public getString(param0: number): string;
      public isLong(param0: number): boolean;
      public getFloat(param0: number): number;
      public constructor();
      public isString(param0: number): boolean;
      public copyStringToBuffer(param0: number, param1: globalAndroid.database.CharArrayBuffer): void;
      public hasWindow(): boolean;
      public getBlob(param0: number): androidNative.Array<number>;
      public getLong(param0: number): number;
      public isBlob(param0: number): boolean;
      public isFloat(param0: number): boolean;
      public getWindow(): net.sqlcipher.CursorWindow;
      public setWindow(param0: net.sqlcipher.CursorWindow): void;
      public getShort(param0: number): number;
      public getType(param0: number): number;
      public getInt(param0: number): number;
    }
  }
}

declare module net {
  export module sqlcipher {
    export class BuildConfig {
      public static class: java.lang.Class<net.sqlcipher.BuildConfig>;
      public static DEBUG: boolean;
      public static LIBRARY_PACKAGE_NAME: string;
      public static BUILD_TYPE: string;
      public static VERSION_NAME: string;
      public constructor();
    }
  }
}

declare module net {
  export module sqlcipher {
    export abstract class BulkCursorNative implements net.sqlcipher.IBulkCursor {
      public static class: java.lang.Class<net.sqlcipher.BulkCursorNative>;
      public onMove(param0: number): void;
      public static asInterface(param0: globalAndroid.os.IBinder): net.sqlcipher.IBulkCursor;
      public asBinder(): globalAndroid.os.IBinder;
      public count(): number;
      public onTransact(param0: number, param1: globalAndroid.os.Parcel, param2: globalAndroid.os.Parcel, param3: number): boolean;
      public deactivate(): void;
      public requery(param0: net.sqlcipher.IContentObserver, param1: net.sqlcipher.CursorWindow): number;
      public respond(param0: globalAndroid.os.Bundle): globalAndroid.os.Bundle;
      public constructor();
      public getWindow(param0: number): net.sqlcipher.CursorWindow;
      public updateRows(param0: java.util.Map<any, any>): boolean;
      public deleteRow(param0: number): boolean;
      public getColumnNames(): androidNative.Array<string>;
      public getExtras(): globalAndroid.os.Bundle;
      public close(): void;
      public getWantsAllOnMoveCalls(): boolean;
    }
  }
}

declare module net {
  export module sqlcipher {
    export class BulkCursorProxy extends net.sqlcipher.IBulkCursor {
      public static class: java.lang.Class<net.sqlcipher.BulkCursorProxy>;
      public onMove(param0: number): void;
      public asBinder(): globalAndroid.os.IBinder;
      public count(): number;
      public deactivate(): void;
      public requery(param0: net.sqlcipher.IContentObserver, param1: net.sqlcipher.CursorWindow): number;
      public respond(param0: globalAndroid.os.Bundle): globalAndroid.os.Bundle;
      public getWindow(param0: number): net.sqlcipher.CursorWindow;
      public updateRows(param0: java.util.Map<any, any>): boolean;
      public updateRows(param0: java.util.Map<any, any>): boolean;
      public deleteRow(param0: number): boolean;
      public getColumnNames(): androidNative.Array<string>;
      public getExtras(): globalAndroid.os.Bundle;
      public constructor(param0: globalAndroid.os.IBinder);
      public close(): void;
      public getWantsAllOnMoveCalls(): boolean;
    }
  }
}

declare module net {
  export module sqlcipher {
    export class BulkCursorToCursorAdaptor extends net.sqlcipher.AbstractWindowedCursor {
      public static class: java.lang.Class<net.sqlcipher.BulkCursorToCursorAdaptor>;
      public getObserver(): net.sqlcipher.IContentObserver;
      public unregisterDataSetObserver(param0: globalAndroid.database.DataSetObserver): void;
      /** @deprecated */
      public commitUpdates(param0: java.util.Map<any, any>): boolean;
      public registerDataSetObserver(param0: globalAndroid.database.DataSetObserver): void;
      public deactivate(): void;
      public requery(): boolean;
      public respond(param0: globalAndroid.os.Bundle): globalAndroid.os.Bundle;
      /** @deprecated */
      public deleteRow(): boolean;
      public set(param0: net.sqlcipher.IBulkCursor): void;
      public constructor();
      public registerContentObserver(param0: globalAndroid.database.ContentObserver): void;
      public copyStringToBuffer(param0: number, param1: globalAndroid.database.CharArrayBuffer): void;
      public onMove(param0: number, param1: number): boolean;
      public set(param0: net.sqlcipher.IBulkCursor, param1: number, param2: number): void;
      public getColumnNames(): androidNative.Array<string>;
      public getExtras(): globalAndroid.os.Bundle;
      public unregisterContentObserver(param0: globalAndroid.database.ContentObserver): void;
      public getCount(): number;
      public close(): void;
      public getType(param0: number): number;
      /** @deprecated */
      public commitUpdates(): boolean;
      public static findRowIdColumnIndex(param0: androidNative.Array<string>): number;
    }
  }
}

declare module net {
  export module sqlcipher {
    export class CrossProcessCursorWrapper extends net.sqlcipher.CursorWrapper {
      public static class: java.lang.Class<net.sqlcipher.CrossProcessCursorWrapper>;
      public fillWindow(param0: number, param1: globalAndroid.database.CursorWindow): void;
      public onMove(param0: number, param1: number): boolean;
      public constructor(param0: net.sqlcipher.Cursor);
      public getWindow(): globalAndroid.database.CursorWindow;
      public getType(param0: number): number;
    }
  }
}

declare module net {
  export module sqlcipher {
    export class Cursor {
      public static class: java.lang.Class<net.sqlcipher.Cursor>;
      /**
       * Constructs a new instance of the net.sqlcipher.Cursor interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: { getType(param0: number): number });
      public constructor();
      public static FIELD_TYPE_INTEGER: number;
      public static FIELD_TYPE_NULL: number;
      public static FIELD_TYPE_STRING: number;
      public static FIELD_TYPE_BLOB: number;
      public static FIELD_TYPE_FLOAT: number;
      public getType(param0: number): number;
    }
  }
}

declare module net {
  export module sqlcipher {
    export class CursorIndexOutOfBoundsException {
      public static class: java.lang.Class<net.sqlcipher.CursorIndexOutOfBoundsException>;
      public constructor(param0: number, param1: number);
      public constructor(param0: string);
    }
  }
}

declare module net {
  export module sqlcipher {
    export class CursorWindow {
      public static class: java.lang.Class<net.sqlcipher.CursorWindow>;
      public static CREATOR: globalAndroid.os.Parcelable.Creator<net.sqlcipher.CursorWindow>;
      public getShort(param0: number, param1: number): number;
      public constructor(param0: boolean);
      public getType(param0: number, param1: number): number;
      public getStartPosition(): number;
      public onAllReferencesReleased(): void;
      /** @deprecated */
      public isFloat(param0: number, param1: number): boolean;
      public allocRow(): boolean;
      public putNull(param0: number, param1: number): boolean;
      public getLong(param0: number, param1: number): number;
      public setRequiredPosition(param0: number): void;
      /** @deprecated */
      public isBlob(param0: number, param1: number): boolean;
      public static newFromParcel(param0: globalAndroid.os.Parcel): net.sqlcipher.CursorWindow;
      public getNumRows(): number;
      public getInt(param0: number, param1: number): number;
      public getRequiredPosition(): number;
      public setStartPosition(param0: number): void;
      public isNull(param0: number, param1: number): boolean;
      public getFloat(param0: number, param1: number): number;
      public close(): void;
      public setNumColumns(param0: number): boolean;
      /** @deprecated */
      public isString(param0: number, param1: number): boolean;
      public finalize(): void;
      public putString(param0: string, param1: number, param2: number): boolean;
      public putDouble(param0: number, param1: number, param2: number): boolean;
      public getString(param0: number, param1: number): string;
      public clear(): void;
      public getDouble(param0: number, param1: number): number;
      public static setCursorWindowAllocation(param0: net.sqlcipher.CursorWindowAllocation): void;
      public putBlob(param0: androidNative.Array<number>, param1: number, param2: number): boolean;
      public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
      public getBlob(param0: number, param1: number): androidNative.Array<number>;
      /** @deprecated */
      public isLong(param0: number, param1: number): boolean;
      public freeLastRow(): void;
      public copyStringToBuffer(param0: number, param1: number, param2: globalAndroid.database.CharArrayBuffer): void;
      public describeContents(): number;
      public static getCursorWindowAllocation(): net.sqlcipher.CursorWindowAllocation;
      public putLong(param0: number, param1: number, param2: number): boolean;
      public constructor(param0: globalAndroid.os.Parcel, param1: number);
    }
  }
}

declare module net {
  export module sqlcipher {
    export class CursorWindowAllocation {
      public static class: java.lang.Class<net.sqlcipher.CursorWindowAllocation>;
      /**
       * Constructs a new instance of the net.sqlcipher.CursorWindowAllocation interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: { getInitialAllocationSize(): number; getGrowthPaddingSize(): number; getMaxAllocationSize(): number });
      public constructor();
      public getGrowthPaddingSize(): number;
      public getMaxAllocationSize(): number;
      public getInitialAllocationSize(): number;
    }
  }
}

declare module net {
  export module sqlcipher {
    export class CursorWrapper implements net.sqlcipher.Cursor {
      public static class: java.lang.Class<net.sqlcipher.CursorWrapper>;
      public getWrappedCursor(): net.sqlcipher.Cursor;
      public constructor(param0: net.sqlcipher.Cursor);
      public getType(param0: number): number;
    }
  }
}

declare module net {
  export module sqlcipher {
    export class CustomCursorWindowAllocation extends net.sqlcipher.CursorWindowAllocation {
      public static class: java.lang.Class<net.sqlcipher.CustomCursorWindowAllocation>;
      public constructor(param0: number, param1: number, param2: number);
      public getGrowthPaddingSize(): number;
      public getMaxAllocationSize(): number;
      public getInitialAllocationSize(): number;
    }
  }
}

declare module net {
  export module sqlcipher {
    export class DatabaseErrorHandler {
      public static class: java.lang.Class<net.sqlcipher.DatabaseErrorHandler>;
      /**
       * Constructs a new instance of the net.sqlcipher.DatabaseErrorHandler interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: { onCorruption(param0: net.sqlcipher.database.SQLiteDatabase): void });
      public constructor();
      public onCorruption(param0: net.sqlcipher.database.SQLiteDatabase): void;
    }
  }
}

declare module net {
  export module sqlcipher {
    export class DatabaseUtils {
      public static class: java.lang.Class<net.sqlcipher.DatabaseUtils>;
      public static cursorLongToContentValues(param0: net.sqlcipher.Cursor, param1: string, param2: globalAndroid.content.ContentValues, param3: string): void;
      public static cursorIntToContentValues(param0: net.sqlcipher.Cursor, param1: string, param2: globalAndroid.content.ContentValues): void;
      public static readExceptionWithFileNotFoundExceptionFromParcel(param0: globalAndroid.os.Parcel): void;
      public static cursorStringToInsertHelper(param0: net.sqlcipher.Cursor, param1: string, param2: net.sqlcipher.DatabaseUtils.InsertHelper, param3: number): void;
      public static longForQuery(param0: net.sqlcipher.database.SQLiteDatabase, param1: string, param2: androidNative.Array<string>): number;
      public static stringForQuery(param0: net.sqlcipher.database.SQLiteStatement, param1: androidNative.Array<string>): string;
      public static dumpCurrentRowToString(param0: net.sqlcipher.Cursor): string;
      public static longForQuery(param0: net.sqlcipher.database.SQLiteStatement, param1: androidNative.Array<string>): number;
      public static dumpCursor(param0: net.sqlcipher.Cursor, param1: java.lang.StringBuilder): void;
      public static cursorLongToContentValuesIfPresent(param0: net.sqlcipher.Cursor, param1: globalAndroid.content.ContentValues, param2: string): void;
      public static dumpCurrentRow(param0: net.sqlcipher.Cursor, param1: java.lang.StringBuilder): void;
      public static cursorDoubleToContentValues(param0: net.sqlcipher.Cursor, param1: string, param2: globalAndroid.content.ContentValues, param3: string): void;
      public static cursorFloatToContentValuesIfPresent(param0: net.sqlcipher.Cursor, param1: globalAndroid.content.ContentValues, param2: string): void;
      public static dumpCursor(param0: net.sqlcipher.Cursor): void;
      public static dumpCurrentRow(param0: net.sqlcipher.Cursor): void;
      public static getTypeOfObject(param0: any): number;
      public static cursorDoubleToCursorValues(param0: net.sqlcipher.Cursor, param1: string, param2: globalAndroid.content.ContentValues): void;
      public static appendEscapedSQLString(param0: java.lang.StringBuilder, param1: string): void;
      public static cursorLongToContentValues(param0: net.sqlcipher.Cursor, param1: string, param2: globalAndroid.content.ContentValues): void;
      public static cursorStringToContentValuesIfPresent(param0: net.sqlcipher.Cursor, param1: globalAndroid.content.ContentValues, param2: string): void;
      public static readExceptionFromParcel(param0: globalAndroid.os.Parcel): void;
      public static appendValueToSql(param0: java.lang.StringBuilder, param1: any): void;
      public static dumpCurrentRow(param0: net.sqlcipher.Cursor, param1: java.io.PrintStream): void;
      public static cursorShortToContentValuesIfPresent(param0: net.sqlcipher.Cursor, param1: globalAndroid.content.ContentValues, param2: string): void;
      public static getHexCollationKey(param0: string): string;
      public static cursorDoubleToContentValuesIfPresent(param0: net.sqlcipher.Cursor, param1: globalAndroid.content.ContentValues, param2: string): void;
      public static cursorIntToContentValues(param0: net.sqlcipher.Cursor, param1: string, param2: globalAndroid.content.ContentValues, param3: string): void;
      public static writeExceptionToParcel(param0: globalAndroid.os.Parcel, param1: java.lang.Exception): void;
      public static sqlEscapeString(param0: string): string;
      public static queryNumEntries(param0: net.sqlcipher.database.SQLiteDatabase, param1: string): number;
      public constructor();
      public static cursorStringToContentValues(param0: net.sqlcipher.Cursor, param1: string, param2: globalAndroid.content.ContentValues, param3: string): void;
      public static cursorFillWindow(param0: net.sqlcipher.Cursor, param1: number, param2: globalAndroid.database.CursorWindow): void;
      public static bindObjectToProgram(param0: net.sqlcipher.database.SQLiteProgram, param1: number, param2: any): void;
      public static getCollationKey(param0: string): string;
      public static cursorStringToContentValues(param0: net.sqlcipher.Cursor, param1: string, param2: globalAndroid.content.ContentValues): void;
      public static cursorRowToContentValues(param0: net.sqlcipher.Cursor, param1: globalAndroid.content.ContentValues): void;
      public static concatenateWhere(param0: string, param1: string): string;
      public static dumpCursorToString(param0: net.sqlcipher.Cursor): string;
      public static readExceptionWithOperationApplicationExceptionFromParcel(param0: globalAndroid.os.Parcel): void;
      public static dumpCursor(param0: net.sqlcipher.Cursor, param1: java.io.PrintStream): void;
      public static stringForQuery(param0: net.sqlcipher.database.SQLiteDatabase, param1: string, param2: androidNative.Array<string>): string;
      public static cursorIntToContentValuesIfPresent(param0: net.sqlcipher.Cursor, param1: globalAndroid.content.ContentValues, param2: string): void;
    }
    export module DatabaseUtils {
      export class InsertHelper {
        public static class: java.lang.Class<net.sqlcipher.DatabaseUtils.InsertHelper>;
        public static TABLE_INFO_PRAGMA_COLUMNNAME_INDEX: number;
        public static TABLE_INFO_PRAGMA_DEFAULT_INDEX: number;
        public bind(param0: number, param1: boolean): void;
        public bind(param0: number, param1: string): void;
        public close(): void;
        public insert(param0: globalAndroid.content.ContentValues): number;
        public getColumnIndex(param0: string): number;
        public prepareForReplace(): void;
        public prepareForInsert(): void;
        public constructor(param0: net.sqlcipher.database.SQLiteDatabase, param1: string);
        public bindNull(param0: number): void;
        public bind(param0: number, param1: androidNative.Array<number>): void;
        public replace(param0: globalAndroid.content.ContentValues): number;
        public bind(param0: number, param1: number): void;
        public execute(): number;
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export class DefaultCursorWindowAllocation extends net.sqlcipher.CursorWindowAllocation {
      public static class: java.lang.Class<net.sqlcipher.DefaultCursorWindowAllocation>;
      public getGrowthPaddingSize(): number;
      public getMaxAllocationSize(): number;
      public constructor();
      public getInitialAllocationSize(): number;
    }
  }
}

declare module net {
  export module sqlcipher {
    export class DefaultDatabaseErrorHandler extends net.sqlcipher.DatabaseErrorHandler {
      public static class: java.lang.Class<net.sqlcipher.DefaultDatabaseErrorHandler>;
      public constructor();
      public onCorruption(param0: net.sqlcipher.database.SQLiteDatabase): void;
    }
  }
}

declare module net {
  export module sqlcipher {
    export class IBulkCursor {
      public static class: java.lang.Class<net.sqlcipher.IBulkCursor>;
      /**
       * Constructs a new instance of the net.sqlcipher.IBulkCursor interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: { getWindow(param0: number): net.sqlcipher.CursorWindow; onMove(param0: number): void; count(): number; getColumnNames(): androidNative.Array<string>; updateRows(param0: java.util.Map<any, any>): boolean; deleteRow(param0: number): boolean; deactivate(): void; close(): void; requery(param0: net.sqlcipher.IContentObserver, param1: net.sqlcipher.CursorWindow): number; getWantsAllOnMoveCalls(): boolean; getExtras(): globalAndroid.os.Bundle; respond(param0: globalAndroid.os.Bundle): globalAndroid.os.Bundle });
      public constructor();
      public static ON_MOVE_TRANSACTION: number;
      public static COUNT_TRANSACTION: number;
      public static GET_CURSOR_WINDOW_TRANSACTION: number;
      public static GET_COLUMN_NAMES_TRANSACTION: number;
      public static CLOSE_TRANSACTION: number;
      public static DELETE_ROW_TRANSACTION: number;
      public static GET_EXTRAS_TRANSACTION: number;
      public static UPDATE_ROWS_TRANSACTION: number;
      public static DEACTIVATE_TRANSACTION: number;
      public static WANTS_ON_MOVE_TRANSACTION: number;
      public static REQUERY_TRANSACTION: number;
      public static RESPOND_TRANSACTION: number;
      public static descriptor: string;
      public onMove(param0: number): void;
      public getWindow(param0: number): net.sqlcipher.CursorWindow;
      public updateRows(param0: java.util.Map<any, any>): boolean;
      public deleteRow(param0: number): boolean;
      public count(): number;
      public deactivate(): void;
      public requery(param0: net.sqlcipher.IContentObserver, param1: net.sqlcipher.CursorWindow): number;
      public respond(param0: globalAndroid.os.Bundle): globalAndroid.os.Bundle;
      public getColumnNames(): androidNative.Array<string>;
      public getExtras(): globalAndroid.os.Bundle;
      public close(): void;
      public getWantsAllOnMoveCalls(): boolean;
    }
  }
}

declare module net {
  export module sqlcipher {
    export class IContentObserver {
      public static class: java.lang.Class<net.sqlcipher.IContentObserver>;
      /**
       * Constructs a new instance of the net.sqlcipher.IContentObserver interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: { onChange(param0: boolean): void });
      public constructor();
      public onChange(param0: boolean): void;
    }
    export module IContentObserver {
      export class Default extends net.sqlcipher.IContentObserver {
        public static class: java.lang.Class<net.sqlcipher.IContentObserver.Default>;
        public onChange(param0: boolean): void;
        public asBinder(): globalAndroid.os.IBinder;
        public constructor();
      }
      export abstract class Stub implements net.sqlcipher.IContentObserver {
        public static class: java.lang.Class<net.sqlcipher.IContentObserver.Stub>;
        public static setDefaultImpl(param0: net.sqlcipher.IContentObserver): boolean;
        public onTransact(param0: number, param1: globalAndroid.os.Parcel, param2: globalAndroid.os.Parcel, param3: number): boolean;
        public static getDefaultImpl(): net.sqlcipher.IContentObserver;
        public onChange(param0: boolean): void;
        public asBinder(): globalAndroid.os.IBinder;
        public static asInterface(param0: globalAndroid.os.IBinder): net.sqlcipher.IContentObserver;
        public constructor();
      }
      export module Stub {
        export class Proxy extends net.sqlcipher.IContentObserver {
          public static class: java.lang.Class<net.sqlcipher.IContentObserver.Stub.Proxy>;
          public static sDefaultImpl: net.sqlcipher.IContentObserver;
          public onChange(param0: boolean): void;
          public getInterfaceDescriptor(): string;
          public asBinder(): globalAndroid.os.IBinder;
        }
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export class InvalidRowColumnException {
      public static class: java.lang.Class<net.sqlcipher.InvalidRowColumnException>;
      public constructor();
      public constructor(param0: string);
    }
  }
}

declare module net {
  export module sqlcipher {
    export class MatrixCursor extends net.sqlcipher.AbstractCursor {
      public static class: java.lang.Class<net.sqlcipher.MatrixCursor>;
      public isNull(param0: number): boolean;
      public getDouble(param0: number): number;
      public addRow(param0: androidNative.Array<any>): void;
      public addRow(param0: java.lang.Iterable<any>): void;
      public getString(param0: number): string;
      public getFloat(param0: number): number;
      public constructor(param0: androidNative.Array<string>);
      public constructor();
      public getLong(param0: number): number;
      public constructor(param0: androidNative.Array<string>, param1: number);
      public getColumnNames(): androidNative.Array<string>;
      public getCount(): number;
      public getShort(param0: number): number;
      public getType(param0: number): number;
      public newRow(): net.sqlcipher.MatrixCursor.RowBuilder;
      public getInt(param0: number): number;
    }
    export module MatrixCursor {
      export class RowBuilder {
        public static class: java.lang.Class<net.sqlcipher.MatrixCursor.RowBuilder>;
        public add(param0: any): net.sqlcipher.MatrixCursor.RowBuilder;
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export class RowAllocationException {
      public static class: java.lang.Class<net.sqlcipher.RowAllocationException>;
      public constructor();
      public constructor(param0: string);
    }
  }
}

declare module net {
  export module sqlcipher {
    export class SQLException {
      public static class: java.lang.Class<net.sqlcipher.SQLException>;
      public constructor();
      public constructor(param0: string);
    }
  }
}

declare module net {
  export module sqlcipher {
    export class StaleDataException {
      public static class: java.lang.Class<net.sqlcipher.StaleDataException>;
      public constructor();
      public constructor(param0: string);
    }
  }
}

declare module net {
  export module sqlcipher {
    export class UnknownTypeException {
      public static class: java.lang.Class<net.sqlcipher.UnknownTypeException>;
      public constructor();
      public constructor(param0: string);
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class DatabaseObjectNotClosedException {
        public static class: java.lang.Class<net.sqlcipher.database.DatabaseObjectNotClosedException>;
        public constructor();
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteAbortException extends net.sqlcipher.database.SQLiteException {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteAbortException>;
        public constructor(param0: string);
        public constructor();
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export abstract class SQLiteClosable {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteClosable>;
        public releaseReference(): void;
        public acquireReference(): void;
        public releaseReferenceFromContainer(): void;
        public onAllReferencesReleasedFromContainer(): void;
        public constructor();
        public onAllReferencesReleased(): void;
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteCompiledSql {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteCompiledSql>;
        public finalize(): void;
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteConstraintException extends net.sqlcipher.database.SQLiteException {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteConstraintException>;
        public constructor(param0: string);
        public constructor();
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteContentHelper {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteContentHelper>;
        public static getBlobColumnAsAssetFile(param0: net.sqlcipher.database.SQLiteDatabase, param1: string, param2: androidNative.Array<string>): globalAndroid.content.res.AssetFileDescriptor;
        public constructor();
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteCursor extends net.sqlcipher.AbstractWindowedCursor {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteCursor>;
        public mNotificationHandler: net.sqlcipher.database.SQLiteCursor.MainThreadNotificationHandler;
        public registerDataSetObserver(param0: globalAndroid.database.DataSetObserver): void;
        public requery(): boolean;
        public close(): void;
        public onMove(param0: number, param1: number): boolean;
        /** @deprecated */
        public commitUpdates(param0: java.util.Map<any, any>): boolean;
        public finalize(): void;
        /** @deprecated */
        public deleteRow(): boolean;
        public getCount(): number;
        public getColumnIndex(param0: string): number;
        public setWindow(param0: net.sqlcipher.CursorWindow): void;
        public cursorPickFillWindowStartPosition(param0: number, param1: number): number;
        public setLoadStyle(param0: number, param1: number): void;
        public constructor();
        public fillWindow(param0: number, param1: globalAndroid.database.CursorWindow): void;
        public setFillWindowForwardOnly(param0: boolean): void;
        public constructor(param0: net.sqlcipher.database.SQLiteDatabase, param1: net.sqlcipher.database.SQLiteCursorDriver, param2: string, param3: net.sqlcipher.database.SQLiteQuery);
        /** @deprecated */
        public supportsUpdates(): boolean;
        public setSelectionArguments(param0: androidNative.Array<string>): void;
        public getType(param0: number): number;
        public getDatabase(): net.sqlcipher.database.SQLiteDatabase;
        public getColumnNames(): androidNative.Array<string>;
        /** @deprecated */
        public commitUpdates(): boolean;
        public deactivate(): void;
      }
      export module SQLiteCursor {
        export class MainThreadNotificationHandler {
          public static class: java.lang.Class<net.sqlcipher.database.SQLiteCursor.MainThreadNotificationHandler>;
          public handleMessage(param0: globalAndroid.os.Message): void;
        }
        export class QueryThread {
          public static class: java.lang.Class<net.sqlcipher.database.SQLiteCursor.QueryThread>;
          public run(): void;
        }
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteCursorDriver {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteCursorDriver>;
        /**
         * Constructs a new instance of the net.sqlcipher.database.SQLiteCursorDriver interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { query(param0: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param1: androidNative.Array<string>): net.sqlcipher.Cursor; cursorDeactivated(): void; cursorRequeried(param0: globalAndroid.database.Cursor): void; cursorClosed(): void; setBindArguments(param0: androidNative.Array<string>): void });
        public constructor();
        public cursorDeactivated(): void;
        public cursorRequeried(param0: globalAndroid.database.Cursor): void;
        public cursorClosed(): void;
        public query(param0: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param1: androidNative.Array<string>): net.sqlcipher.Cursor;
        public setBindArguments(param0: androidNative.Array<string>): void;
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteDatabase extends net.sqlcipher.database.SQLiteClosable {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteDatabase>;
        public static SQLCIPHER_ANDROID_VERSION: string;
        public static CONFLICT_ROLLBACK: number;
        public static CONFLICT_ABORT: number;
        public static CONFLICT_FAIL: number;
        public static CONFLICT_IGNORE: number;
        public static CONFLICT_REPLACE: number;
        public static CONFLICT_NONE: number;
        public static SQLITE_MAX_LIKE_PATTERN_LENGTH: number;
        public static OPEN_READWRITE: number;
        public static OPEN_READONLY: number;
        public static NO_LOCALIZED_COLLATORS: number;
        public static CREATE_IF_NECESSARY: number;
        public static MEMORY: string;
        public static MAX_SQL_CACHE_SIZE: number;
        public static create(param0: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param1: androidNative.Array<string>): net.sqlcipher.database.SQLiteDatabase;
        public resetCompiledSqlCache(): void;
        public constructor(param0: string, param1: androidNative.Array<number>, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: number, param4: net.sqlcipher.database.SQLiteDatabaseHook);
        public static openDatabase(param0: string, param1: string, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: number, param4: net.sqlcipher.database.SQLiteDatabaseHook): net.sqlcipher.database.SQLiteDatabase;
        public compileStatement(param0: string): net.sqlcipher.database.SQLiteStatement;
        public setMaxSqlCacheSize(param0: number): void;
        public rawQuery(param0: string, param1: androidNative.Array<any>): net.sqlcipher.Cursor;
        public beginTransactionWithListenerNonExclusive(param0: net.sqlcipher.database.SQLiteTransactionListener): void;
        public static openDatabase(param0: string, param1: androidNative.Array<string>, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: number): net.sqlcipher.database.SQLiteDatabase;
        public setVersion(param0: number): void;
        public isDbLockedByCurrentThread(): boolean;
        public insertOrThrow(param0: string, param1: string, param2: globalAndroid.content.ContentValues): number;
        public static releaseMemory(): number;
        /** @deprecated */
        public yieldIfContended(): boolean;
        public insert(param0: string, param1: string, param2: globalAndroid.content.ContentValues): number;
        public query(param0: androidx.sqlite.db.SupportSQLiteQuery, param1: globalAndroid.os.CancellationSignal): globalAndroid.database.Cursor;
        public inTransaction(): boolean;
        public enableWriteAheadLogging(): boolean;
        public insert(param0: string, param1: number, param2: globalAndroid.content.ContentValues): number;
        public static openOrCreateDatabase(param0: string, param1: androidNative.Array<number>, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: net.sqlcipher.database.SQLiteDatabaseHook): net.sqlcipher.database.SQLiteDatabase;
        public execSQL(param0: string): void;
        public static loadLibs(param0: globalAndroid.content.Context): void;
        public static openDatabase(param0: string, param1: string, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: number): net.sqlcipher.database.SQLiteDatabase;
        public static openOrCreateDatabase(param0: string, param1: androidNative.Array<number>, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory): net.sqlcipher.database.SQLiteDatabase;
        public changePassword(param0: androidNative.Array<string>): void;
        public yieldIfContendedSafely(): boolean;
        public query(param0: string): globalAndroid.database.Cursor;
        public update(param0: string, param1: globalAndroid.content.ContentValues, param2: string, param3: androidNative.Array<string>): number;
        public queryWithFactory(param0: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param1: boolean, param2: string, param3: androidNative.Array<string>, param4: string, param5: androidNative.Array<string>, param6: string, param7: string, param8: string, param9: string): net.sqlcipher.Cursor;
        public rawQuery(param0: string, param1: androidNative.Array<string>, param2: number, param3: number): net.sqlcipher.Cursor;
        public updateWithOnConflict(param0: string, param1: globalAndroid.content.ContentValues, param2: string, param3: androidNative.Array<string>, param4: number): number;
        public static openOrCreateDatabase(param0: string, param1: string, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory): net.sqlcipher.database.SQLiteDatabase;
        public static openOrCreateDatabase(param0: string, param1: string, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: net.sqlcipher.database.SQLiteDatabaseHook): net.sqlcipher.database.SQLiteDatabase;
        public static openOrCreateDatabase(param0: string, param1: androidNative.Array<number>, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: net.sqlcipher.database.SQLiteDatabaseHook, param4: net.sqlcipher.DatabaseErrorHandler): net.sqlcipher.database.SQLiteDatabase;
        public static openOrCreateDatabase(param0: java.io.File, param1: string, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: net.sqlcipher.database.SQLiteDatabaseHook, param4: net.sqlcipher.DatabaseErrorHandler): net.sqlcipher.database.SQLiteDatabase;
        public beginTransactionWithListener(param0: net.sqlcipher.database.SQLiteTransactionListener): void;
        public execSQL(param0: string, param1: androidNative.Array<any>): void;
        public getSyncedTables(): java.util.Map<string, string>;
        public static openDatabase(param0: string, param1: string, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: number, param4: net.sqlcipher.database.SQLiteDatabaseHook, param5: net.sqlcipher.DatabaseErrorHandler): net.sqlcipher.database.SQLiteDatabase;
        public status(param0: number, param1: boolean): number;
        public setMaximumSize(param0: number): number;
        public static getChars(param0: androidNative.Array<number>): androidNative.Array<string>;
        public setPageSize(param0: number): void;
        public getMaximumSize(): number;
        public isDatabaseIntegrityOk(): boolean;
        public static openOrCreateDatabase(param0: string, param1: androidNative.Array<string>, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: net.sqlcipher.database.SQLiteDatabaseHook, param4: net.sqlcipher.DatabaseErrorHandler): net.sqlcipher.database.SQLiteDatabase;
        public static loadLibs(param0: globalAndroid.content.Context, param1: net.sqlcipher.database.SQLiteDatabase.LibraryLoader): void;
        public static create(param0: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param1: string): net.sqlcipher.database.SQLiteDatabase;
        public getAttachedDbs(): java.util.List<globalAndroid.util.Pair<string, string>>;
        public delete(param0: string, param1: string, param2: androidNative.Array<any>): number;
        public static openOrCreateDatabase(param0: java.io.File, param1: string, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: net.sqlcipher.database.SQLiteDatabaseHook): net.sqlcipher.database.SQLiteDatabase;
        public isReadOnly(): boolean;
        public setLocale(param0: java.util.Locale): void;
        public changePassword(param0: string): void;
        public beginTransaction(): void;
        public static loadLibs(param0: globalAndroid.content.Context, param1: java.io.File, param2: net.sqlcipher.database.SQLiteDatabase.LibraryLoader): void;
        public static setICURoot(param0: string): void;
        public needUpgrade(param0: number): boolean;
        public static openOrCreateDatabase(param0: string, param1: string, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: net.sqlcipher.database.SQLiteDatabaseHook, param4: net.sqlcipher.DatabaseErrorHandler): net.sqlcipher.database.SQLiteDatabase;
        public static openOrCreateDatabase(param0: java.io.File, param1: string, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory): net.sqlcipher.database.SQLiteDatabase;
        public beginTransactionWithListener(param0: globalAndroid.database.sqlite.SQLiteTransactionListener): void;
        public rawQuery(param0: string, param1: androidNative.Array<string>): net.sqlcipher.Cursor;
        public static loadLibs(param0: globalAndroid.content.Context, param1: java.io.File): void;
        public constructor();
        public getMaxSqlCacheSize(): number;
        public constructor(param0: string, param1: androidNative.Array<string>, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: number, param4: net.sqlcipher.database.SQLiteDatabaseHook);
        public yieldIfContendedSafely(param0: number): boolean;
        public insertWithOnConflict(param0: string, param1: string, param2: globalAndroid.content.ContentValues, param3: number): number;
        public query(param0: string, param1: androidNative.Array<string>, param2: string, param3: androidNative.Array<string>, param4: string, param5: string, param6: string): net.sqlcipher.Cursor;
        public isWriteAheadLoggingEnabled(): boolean;
        public replaceOrThrow(param0: string, param1: string, param2: globalAndroid.content.ContentValues): number;
        public isDbLockedByOtherThreads(): boolean;
        public close(): void;
        public setTransactionSuccessful(): void;
        public rawQueryWithFactory(param0: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param1: string, param2: androidNative.Array<string>, param3: string): net.sqlcipher.Cursor;
        public getPath(): string;
        public replace(param0: string, param1: string, param2: globalAndroid.content.ContentValues): number;
        public getVersion(): number;
        public update(param0: string, param1: number, param2: globalAndroid.content.ContentValues, param3: string, param4: androidNative.Array<any>): number;
        public setForeignKeyConstraintsEnabled(param0: boolean): void;
        public static openDatabase(param0: string, param1: androidNative.Array<string>, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: number, param4: net.sqlcipher.database.SQLiteDatabaseHook, param5: net.sqlcipher.DatabaseErrorHandler): net.sqlcipher.database.SQLiteDatabase;
        public query(param0: string, param1: androidNative.Array<string>, param2: string, param3: androidNative.Array<string>, param4: string, param5: string, param6: string, param7: string): net.sqlcipher.Cursor;
        public finalize(): void;
        public beginTransactionNonExclusive(): void;
        public query(param0: androidx.sqlite.db.SupportSQLiteQuery): globalAndroid.database.Cursor;
        public rawExecSQL(param0: string): void;
        public query(param0: string, param1: androidNative.Array<any>): globalAndroid.database.Cursor;
        public static findEditTable(param0: string): string;
        public getQueryStats(param0: string, param1: androidNative.Array<any>): net.sqlcipher.database.SQLiteQueryStats;
        public onAllReferencesReleased(): void;
        public query(param0: boolean, param1: string, param2: androidNative.Array<string>, param3: string, param4: androidNative.Array<string>, param5: string, param6: string, param7: string, param8: string): net.sqlcipher.Cursor;
        public beginTransactionWithListenerNonExclusive(param0: globalAndroid.database.sqlite.SQLiteTransactionListener): void;
        public delete(param0: string, param1: string, param2: androidNative.Array<string>): number;
        public purgeFromCompiledSqlCache(param0: string): void;
        public static openOrCreateDatabase(param0: string, param1: androidNative.Array<string>, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory): net.sqlcipher.database.SQLiteDatabase;
        public constructor(param0: string, param1: androidNative.Array<string>, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: number);
        public static openOrCreateDatabase(param0: string, param1: androidNative.Array<string>, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: net.sqlcipher.database.SQLiteDatabaseHook): net.sqlcipher.database.SQLiteDatabase;
        public setLockingEnabled(param0: boolean): void;
        public disableWriteAheadLogging(): void;
        public static openDatabase(param0: string, param1: androidNative.Array<number>, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: number, param4: net.sqlcipher.database.SQLiteDatabaseHook, param5: net.sqlcipher.DatabaseErrorHandler): net.sqlcipher.database.SQLiteDatabase;
        public markTableSyncable(param0: string, param1: string): void;
        public getPageSize(): number;
        public isOpen(): boolean;
        public endTransaction(): void;
        public static getBytes(param0: androidNative.Array<string>): androidNative.Array<number>;
        public isInCompiledSqlCache(param0: string): boolean;
        public static openDatabase(param0: string, param1: androidNative.Array<string>, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: number, param4: net.sqlcipher.database.SQLiteDatabaseHook): net.sqlcipher.database.SQLiteDatabase;
        public markTableSyncable(param0: string, param1: string, param2: string): void;
      }
      export module SQLiteDatabase {
        export class CursorFactory {
          public static class: java.lang.Class<net.sqlcipher.database.SQLiteDatabase.CursorFactory>;
          /**
           * Constructs a new instance of the net.sqlcipher.database.SQLiteDatabase$CursorFactory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { newCursor(param0: net.sqlcipher.database.SQLiteDatabase, param1: net.sqlcipher.database.SQLiteCursorDriver, param2: string, param3: net.sqlcipher.database.SQLiteQuery): net.sqlcipher.Cursor });
          public constructor();
          public newCursor(param0: net.sqlcipher.database.SQLiteDatabase, param1: net.sqlcipher.database.SQLiteCursorDriver, param2: string, param3: net.sqlcipher.database.SQLiteQuery): net.sqlcipher.Cursor;
        }
        export class LibraryLoader {
          public static class: java.lang.Class<net.sqlcipher.database.SQLiteDatabase.LibraryLoader>;
          /**
           * Constructs a new instance of the net.sqlcipher.database.SQLiteDatabase$LibraryLoader interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { loadLibraries(param0: androidNative.Array<string>): void });
          public constructor();
          public loadLibraries(param0: androidNative.Array<string>): void;
        }
        export class SQLiteDatabaseTransactionType {
          public static class: java.lang.Class<net.sqlcipher.database.SQLiteDatabase.SQLiteDatabaseTransactionType>;
          public static Deferred: net.sqlcipher.database.SQLiteDatabase.SQLiteDatabaseTransactionType;
          public static Immediate: net.sqlcipher.database.SQLiteDatabase.SQLiteDatabaseTransactionType;
          public static Exclusive: net.sqlcipher.database.SQLiteDatabase.SQLiteDatabaseTransactionType;
          public static valueOf(param0: string): net.sqlcipher.database.SQLiteDatabase.SQLiteDatabaseTransactionType;
          public static values(): androidNative.Array<net.sqlcipher.database.SQLiteDatabase.SQLiteDatabaseTransactionType>;
        }
        export class SyncUpdateInfo {
          public static class: java.lang.Class<net.sqlcipher.database.SQLiteDatabase.SyncUpdateInfo>;
        }
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteDatabaseCorruptException extends net.sqlcipher.database.SQLiteException {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteDatabaseCorruptException>;
        public constructor(param0: string);
        public constructor();
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteDatabaseHook {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteDatabaseHook>;
        /**
         * Constructs a new instance of the net.sqlcipher.database.SQLiteDatabaseHook interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { preKey(param0: net.sqlcipher.database.SQLiteDatabase): void; postKey(param0: net.sqlcipher.database.SQLiteDatabase): void });
        public constructor();
        public preKey(param0: net.sqlcipher.database.SQLiteDatabase): void;
        public postKey(param0: net.sqlcipher.database.SQLiteDatabase): void;
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteDebug {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteDebug>;
        public static DEBUG_SQL_STATEMENTS: boolean;
        public static DEBUG_SQL_TIME: boolean;
        public static DEBUG_SQL_CACHE: boolean;
        public static DEBUG_ACTIVE_CURSOR_FINALIZATION: boolean;
        public static DEBUG_LOCK_TIME_TRACKING: boolean;
        public static DEBUG_LOCK_TIME_TRACKING_STACK_TRACE: boolean;
        public static getHeapFreeSize(): number;
        public static getHeapDirtyPages(param0: androidNative.Array<number>): void;
        public static getHeapAllocatedSize(): number;
        public static getHeapSize(): number;
        public static getNumActiveCursorsFinalized(): number;
        public static getDatabaseInfo(): net.sqlcipher.database.SQLiteDebug.PagerStats;
        public static getPagerStats(param0: net.sqlcipher.database.SQLiteDebug.PagerStats): void;
        public constructor();
      }
      export module SQLiteDebug {
        export class DbStats {
          public static class: java.lang.Class<net.sqlcipher.database.SQLiteDebug.DbStats>;
          public dbName: string;
          public pageSize: number;
          public dbSize: number;
          public lookaside: number;
          public constructor(param0: string, param1: number, param2: number, param3: number);
        }
        export class PagerStats {
          public static class: java.lang.Class<net.sqlcipher.database.SQLiteDebug.PagerStats>;
          public totalBytes: number;
          public referencedBytes: number;
          public databaseBytes: number;
          public numPagers: number;
          public memoryUsed: number;
          public pageCacheOverflo: number;
          public largestMemAlloc: number;
          public dbStats: java.util.ArrayList<net.sqlcipher.database.SQLiteDebug.DbStats>;
          public constructor();
        }
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteDirectCursorDriver extends net.sqlcipher.database.SQLiteCursorDriver {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteDirectCursorDriver>;
        public cursorDeactivated(): void;
        public cursorClosed(): void;
        public cursorRequeried(param0: globalAndroid.database.Cursor): void;
        public query(param0: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param1: androidNative.Array<string>): net.sqlcipher.Cursor;
        public toString(): string;
        public setBindArguments(param0: androidNative.Array<string>): void;
        public constructor(param0: net.sqlcipher.database.SQLiteDatabase, param1: string, param2: string);
        public query(param0: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param1: androidNative.Array<any>): net.sqlcipher.Cursor;
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteDiskIOException extends net.sqlcipher.database.SQLiteException {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteDiskIOException>;
        public constructor(param0: string);
        public constructor();
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteDoneException extends net.sqlcipher.database.SQLiteException {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteDoneException>;
        public constructor(param0: string);
        public constructor();
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteException extends net.sqlcipher.SQLException {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteException>;
        public constructor(param0: string);
        public constructor();
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteFullException extends net.sqlcipher.database.SQLiteException {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteFullException>;
        public constructor(param0: string);
        public constructor();
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteMisuseException extends net.sqlcipher.database.SQLiteException {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteMisuseException>;
        public constructor(param0: string);
        public constructor();
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export abstract class SQLiteOpenHelper {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteOpenHelper>;
        public close(): void;
        public onDowngrade(param0: net.sqlcipher.database.SQLiteDatabase, param1: number, param2: number): void;
        public onConfigure(param0: net.sqlcipher.database.SQLiteDatabase): void;
        public getReadableDatabase(param0: string): net.sqlcipher.database.SQLiteDatabase;
        public constructor(param0: globalAndroid.content.Context, param1: string, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: number, param4: net.sqlcipher.database.SQLiteDatabaseHook);
        public getWritableDatabase(param0: string): net.sqlcipher.database.SQLiteDatabase;
        public onOpen(param0: net.sqlcipher.database.SQLiteDatabase): void;
        public constructor(param0: globalAndroid.content.Context, param1: string, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: number);
        public onUpgrade(param0: net.sqlcipher.database.SQLiteDatabase, param1: number, param2: number): void;
        public onCreate(param0: net.sqlcipher.database.SQLiteDatabase): void;
        public setWriteAheadLoggingEnabled(param0: boolean): void;
        public getDatabaseName(): string;
        public getWritableDatabase(param0: androidNative.Array<number>): net.sqlcipher.database.SQLiteDatabase;
        public getReadableDatabase(param0: androidNative.Array<number>): net.sqlcipher.database.SQLiteDatabase;
        public getWritableDatabase(param0: androidNative.Array<string>): net.sqlcipher.database.SQLiteDatabase;
        public getReadableDatabase(param0: androidNative.Array<string>): net.sqlcipher.database.SQLiteDatabase;
        public constructor(param0: globalAndroid.content.Context, param1: string, param2: net.sqlcipher.database.SQLiteDatabase.CursorFactory, param3: number, param4: net.sqlcipher.database.SQLiteDatabaseHook, param5: net.sqlcipher.DatabaseErrorHandler);
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export abstract class SQLiteProgram extends net.sqlcipher.database.SQLiteClosable {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteProgram>;
        public mDatabase: net.sqlcipher.database.SQLiteDatabase;
        public nHandle: number;
        public nStatement: number;
        public bindBlob(param0: number, param1: androidNative.Array<number>): void;
        public close(): void;
        /** @deprecated */
        public native_compile(param0: string): void;
        public native_bind_null(param0: number): void;
        public bindString(param0: number, param1: string): void;
        /** @deprecated */
        public native_finalize(): void;
        public native_bind_long(param0: number, param1: number): void;
        /** @deprecated */
        public compile(param0: string, param1: boolean): void;
        public native_bind_double(param0: number, param1: number): void;
        public native_bind_blob(param0: number, param1: androidNative.Array<number>): void;
        public bindNull(param0: number): void;
        public native_bind_string(param0: number, param1: string): void;
        public clearBindings(): void;
        public bindDouble(param0: number, param1: number): void;
        public getUniqueId(): number;
        public bindLong(param0: number, param1: number): void;
        public onAllReferencesReleasedFromContainer(): void;
        public onAllReferencesReleased(): void;
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteQuery extends net.sqlcipher.database.SQLiteProgram {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteQuery>;
        public bindString(param0: number, param1: string): void;
        public bindDouble(param0: number, param1: number): void;
        public bindLong(param0: number, param1: number): void;
        public toString(): string;
        public bindArguments(param0: androidNative.Array<any>): void;
        public bindNull(param0: number): void;
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteQueryBuilder {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteQueryBuilder>;
        public setStrictProjectionMap(param0: boolean): void;
        public setCursorFactory(param0: net.sqlcipher.database.SQLiteDatabase.CursorFactory): void;
        public query(param0: net.sqlcipher.database.SQLiteDatabase, param1: androidNative.Array<string>, param2: string, param3: androidNative.Array<string>, param4: string, param5: string, param6: string): net.sqlcipher.Cursor;
        public buildQuery(param0: androidNative.Array<string>, param1: string, param2: androidNative.Array<string>, param3: string, param4: string, param5: string, param6: string): string;
        public buildUnionQuery(param0: androidNative.Array<string>, param1: string, param2: string): string;
        public constructor();
        public setProjectionMap(param0: java.util.Map<string, string>): void;
        public static appendColumns(param0: java.lang.StringBuilder, param1: androidNative.Array<string>): void;
        public static buildQueryString(param0: boolean, param1: string, param2: androidNative.Array<string>, param3: string, param4: string, param5: string, param6: string, param7: string): string;
        public setTables(param0: string): void;
        public buildUnionSubQuery(param0: string, param1: androidNative.Array<string>, param2: java.util.Set<string>, param3: number, param4: string, param5: string, param6: androidNative.Array<string>, param7: string, param8: string): string;
        public getTables(): string;
        public setDistinct(param0: boolean): void;
        public appendWhere(param0: string): void;
        public appendWhereEscapeString(param0: string): void;
        public query(param0: net.sqlcipher.database.SQLiteDatabase, param1: androidNative.Array<string>, param2: string, param3: androidNative.Array<string>, param4: string, param5: string, param6: string, param7: string): net.sqlcipher.Cursor;
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteQueryStats {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteQueryStats>;
        public constructor(param0: number, param1: number);
        public getLargestIndividualRowSize(): number;
        public getTotalQueryResultSize(): number;
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteStatement extends net.sqlcipher.database.SQLiteProgram {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteStatement>;
        public execute(): void;
        public simpleQueryForString(): string;
        public executeUpdateDelete(): number;
        public simpleQueryForLong(): number;
        public executeInsert(): number;
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SQLiteTransactionListener {
        public static class: java.lang.Class<net.sqlcipher.database.SQLiteTransactionListener>;
        /**
         * Constructs a new instance of the net.sqlcipher.database.SQLiteTransactionListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { onBegin(): void; onCommit(): void; onRollback(): void });
        public constructor();
        public onCommit(): void;
        public onBegin(): void;
        public onRollback(): void;
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SqliteWrapper {
        public static class: java.lang.Class<net.sqlcipher.database.SqliteWrapper>;
        public static insert(param0: globalAndroid.content.Context, param1: globalAndroid.content.ContentResolver, param2: globalAndroid.net.Uri, param3: globalAndroid.content.ContentValues): globalAndroid.net.Uri;
        public static delete(param0: globalAndroid.content.Context, param1: globalAndroid.content.ContentResolver, param2: globalAndroid.net.Uri, param3: string, param4: androidNative.Array<string>): number;
        public static update(param0: globalAndroid.content.Context, param1: globalAndroid.content.ContentResolver, param2: globalAndroid.net.Uri, param3: globalAndroid.content.ContentValues, param4: string, param5: androidNative.Array<string>): number;
        public static requery(param0: globalAndroid.content.Context, param1: globalAndroid.database.Cursor): boolean;
        public static checkSQLiteException(param0: globalAndroid.content.Context, param1: net.sqlcipher.database.SQLiteException): void;
        public static query(param0: globalAndroid.content.Context, param1: globalAndroid.content.ContentResolver, param2: globalAndroid.net.Uri, param3: androidNative.Array<string>, param4: string, param5: androidNative.Array<string>, param6: string): net.sqlcipher.Cursor;
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SupportFactory {
        public static class: java.lang.Class<net.sqlcipher.database.SupportFactory>;
        public constructor(param0: androidNative.Array<number>, param1: net.sqlcipher.database.SQLiteDatabaseHook);
        public constructor(param0: androidNative.Array<number>);
        public create(param0: androidx.sqlite.db.SupportSQLiteOpenHelper.Configuration): androidx.sqlite.db.SupportSQLiteOpenHelper;
        public constructor(param0: androidNative.Array<number>, param1: net.sqlcipher.database.SQLiteDatabaseHook, param2: boolean);
      }
    }
  }
}

declare module net {
  export module sqlcipher {
    export module database {
      export class SupportHelper {
        public static class: java.lang.Class<net.sqlcipher.database.SupportHelper>;
        public close(): void;
        public setWriteAheadLoggingEnabled(param0: boolean): void;
        public getReadableDatabase(): androidx.sqlite.db.SupportSQLiteDatabase;
        public getWritableDatabase(): androidx.sqlite.db.SupportSQLiteDatabase;
        public getDatabaseName(): string;
      }
    }
  }
}

//Generics information:
