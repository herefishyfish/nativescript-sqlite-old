export enum RESULTCODE {
  SQLITE_OK = 0 /* Successful result */,
  SQLITE_ERROR = 1 /* SQL error or missing database */,
  SQLITE_INTERNAL = 2 /* Internal logic error in SQLite */,
  SQLITE_PERM = 3 /* Access permission denied */,
  SQLITE_ABORT = 4 /* Callback routine requested an abort */,
  SQLITE_BUSY = 5 /* The database file is locked */,
  SQLITE_LOCKED = 6 /* A table in the database is locked */,
  SQLITE_NOMEM = 7 /* A malloc() failed */,
  SQLITE_READONLY = 8 /* Attempt to write a readonly database */,
  SQLITE_INTERRUPT = 9 /* Operation terminated by sqlite3_interrupt()*/,
  SQLITE_IOERR = 10 /* Some kind of disk I/O error occurred */,
  SQLITE_CORRUPT = 11 /* The database disk image is malformed */,
  SQLITE_NOTFOUND = 12 /* Unknown opcode in sqlite3_file_control() */,
  SQLITE_FULL = 13 /* Insertion failed because database is full */,
  SQLITE_CANTOPEN = 14 /* Unable to open the database file */,
  SQLITE_PROTOCOL = 15 /* Database lock protocol error */,
  SQLITE_EMPTY = 16 /* Database is empty */,
  SQLITE_SCHEMA = 17 /* The database schema changed */,
  SQLITE_TOOBIG = 18 /* String or BLOB exceeds size limit */,
  SQLITE_CONSTRAINT = 19 /* Abort due to constraint violation */,
  SQLITE_MISMATCH = 20 /* Data type mismatch */,
  SQLITE_MISUSE = 21 /* Library used incorrectly */,
  SQLITE_NOLFS = 22 /* Uses OS features not supported on host */,
  SQLITE_AUTH = 23 /* Authorization denied */,
  SQLITE_FORMAT = 24 /* Auxiliary database format error */,
  SQLITE_RANGE = 25 /* 2nd parameter to sqlite3_bind out of range */,
  SQLITE_NOTADB = 26 /* File opened that is not a database file */,
  SQLITE_NOTICE = 27 /* Notifications from sqlite3_log() */,
  SQLITE_WARNING = 28 /* Warnings from sqlite3_log() */,
  SQLITE_ROW = 100 /* sqlite3_step() has another row ready */,
  SQLITE_DONE = 101 /* sqlite3_step() has finished executing */,
  SQLITE_OK_LOAD_PERMANENTLY = 256 /* sqlite3_load_extension() has finished */,
  // TODO: Extend this enum
}

export enum OPENFLAG {
  SQLITE_OPEN_READONLY = 0x00000001 /* Ok for sqlite3_open_v2() */,
  SQLITE_OPEN_READWRITE = 0x00000002 /* Ok for sqlite3_open_v2() */,
  SQLITE_OPEN_CREATE = 0x00000004 /* Ok for sqlite3_open_v2() */,
  SQLITE_OPEN_DELETEONCLOSE = 0x00000008 /* VFS only */,
  SQLITE_OPEN_EXCLUSIVE = 0x00000010 /* VFS only */,
  SQLITE_OPEN_AUTOPROXY = 0x00000020 /* VFS only */,
  SQLITE_OPEN_URI = 0x00000040 /* Ok for sqlite3_open_v2() */,
  SQLITE_OPEN_MEMORY = 0x00000080 /* Ok for sqlite3_open_v2() */,
  SQLITE_OPEN_MAIN_DB = 0x00000100 /* VFS only */,
  SQLITE_OPEN_TEMP_DB = 0x00000200 /* VFS only */,
  SQLITE_OPEN_TRANSIENT_DB = 0x00000400 /* VFS only */,
  SQLITE_OPEN_MAIN_JOURNAL = 0x00000800 /* VFS only */,
  SQLITE_OPEN_TEMP_JOURNAL = 0x00001000 /* VFS only */,
  SQLITE_OPEN_SUBJOURNAL = 0x00002000 /* VFS only */,
  SQLITE_OPEN_SUPER_JOURNAL = 0x00004000 /* VFS only */,
  SQLITE_OPEN_NOMUTEX = 0x00008000 /* Ok for sqlite3_open_v2() */,
  SQLITE_OPEN_FULLMUTEX = 0x00010000 /* Ok for sqlite3_open_v2() */,
  SQLITE_OPEN_SHAREDCACHE = 0x00020000 /* Ok for sqlite3_open_v2() */,
  SQLITE_OPEN_PRIVATECACHE = 0x00040000 /* Ok for sqlite3_open_v2() */,
  SQLITE_OPEN_WAL = 0x00080000 /* VFS only */,
  SQLITE_OPEN_NOFOLLOW = 0x01000000 /* Ok for sqlite3_open_v2() */,
  SQLITE_OPEN_EXRESCODE = 0x02000000 /* Extended result codes */,
}

export class Sqlite3 {
  static open(path: string): Promise<Sqlite3>;
  static open_v2(path: string, flags: number): Promise<Sqlite3>;

  sqlite3_prepare(sql: string): Promise<Sqlite3Statement>;
  sqlite3_prepare_v2(sql: string): Promise<Sqlite3Statement>;
  sqlite3_prepare_v3(sql: string): Promise<Sqlite3Statement>;
}

export class Sqlite3Statement {
  sqlite3_bind_blob(parameterIndex: number, value: ArrayBuffer): Promise<void>;
  sqlite3_bind_blob64(parameterIndex: number, value: ArrayBuffer): Promise<void>;
  sqlite3_bind_double(parameterIndex: number, value: number): Promise<void>;
  sqlite3_bind_int(parameterIndex: number, value: number): Promise<void>;
  sqlite3_bind_int64(parameterIndex: number, value: number): Promise<void>;
  sqlite3_bind_null(parameterIndex: number): Promise<void>;
  sqlite3_bind_parameter_count(): number;
  sqlite3_bind_parameter_index(name: string): number;
  sqlite3_bind_parameter_name(index: number): string;
  sqlite3_bind_pointer(parameterIndex: number, value: any, type: string, destructor: any): Promise<void>;
  sqlite3_bind_text(parameterIndex: number, value: string): Promise<void>;
  sqlite3_bind_text16(parameterIndex: number, value: string): Promise<void>;
  sqlite3_bind_text64(parameterIndex: number, value: string): Promise<void>;
  sqlite3_bind_value(parameterIndex: number, value: any): Promise<void>;
  sqlite3_bind_zeroblob(parameterIndex: number, length: number): Promise<void>;
  sqlite3_bind_zeroblob64(parameterIndex: number, length: number): Promise<void>;
  sqlite3_clear_bindings(): Promise<void>;

  sqlite3_column_blob(columnIndex: number): ArrayBuffer;
  sqlite3_column_bytes(columnIndex: number): number;
  sqlite3_column_bytes16(columnIndex: number): number;
  sqlite3_column_count(): number;
  sqlite3_column_database_name(columnIndex: number): string;
  sqlite3_column_database_name16(columnIndex: number): string;
  sqlite3_column_decltype(columnIndex: number): string;
  sqlite3_column_decltype16(columnIndex: number): string;
  sqlite3_column_double(columnIndex: number): number;
  sqlite3_column_int(columnIndex: number): number;
  sqlite3_column_int64(columnIndex: number): number;
  sqlite3_column_name(columnIndex: number): string;
  sqlite3_column_name16(columnIndex: number): string;
  sqlite3_column_origin_name(columnIndex: number): string;
  sqlite3_column_origin_name16(columnIndex: number): string;
  sqlite3_column_table_name(columnIndex: number): string;
  sqlite3_column_table_name16(columnIndex: number): string;
  sqlite3_column_text(columnIndex: number): string;
  sqlite3_column_text16(columnIndex: number): string;
  sqlite3_column_type(columnIndex: number): number;
  sqlite3_column_value(columnIndex: number): any;

  sqlite3_data_count(): number;
  sqlite3_db_handle(): any;
  sqlite3_expanded_sql(): string;
  sqlite3_normalized_sql(): string;
  sqlite3_reset(): Promise<void>;
  sqlite3_sql(): string;
  sqlite3_step(): number;

  // destructor
  sqlite3_finalize(): Promise<void>;
}
