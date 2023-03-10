export * from './common';
export * from './utils';

export abstract class AbstractSQLiteDatabase<T = any> implements ISQLiteDatabase {}

export class SQLiteDatabase extends AbstractSQLiteDatabase {}
