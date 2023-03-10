export declare function applyMixins(
  derivedCtor: any,
  baseCtors: any[],
  options?: {
    after?: boolean;
    override?: boolean;
    omit?: (string | symbol)[];
  }
): void;
