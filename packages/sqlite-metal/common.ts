import { NSCSQLite, SqliteOpenOptions } from '.';

export class SqliteMetalCommon {
  private native: NSCSQLite;

  constructor(options: SqliteOpenOptions | any) {
    console.log('SqliteMetalCommon constructor', options);
    this.native = new NSCSQLite(options);
    console.dir(this.native);
  }

  execute<T = any>(query: string, params?: any[]): T[] {
    return this.native.execute(query, params);
  }

  executeAsync<T = any>(query: string, params?: any[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
      try {
        this.native.executeAsync(query, params, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result as any);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  attach(alias: string, path: string): void {
    this.native.attach(alias, path);
  }

  detach(alias: string): void {
    this.native.detach(alias);
  }

  close(): void {
    this.native.close();
  }

  delete(): void {
    this.native.delete();
  }
}
