export type ContractFetchReturnType<
  T = undefined,
  S extends boolean = boolean,
> = S extends true
  ? { success: true; loading: boolean; error?: undefined; data: T }
  : { success: false; loading: boolean; error: string; data?: undefined };

export type ContractCallbackReturnType<
  T = undefined,
  S extends boolean = boolean,
> = S extends true
  ? { success: true; error?: undefined; data?: T }
  : { success: false; error: string; data?: T };
