export type ContractCallbackReturnType<
  T = undefined,
  S extends boolean = boolean,
> = S extends true
  ? { success: true; error?: undefined; data?: T }
  : { success: false; error: string; data?: T };
