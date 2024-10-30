type CallbackHookReturnType<T extends any, R> = {
  callback: (args: T) => Promise<R>;
  error: Error | null;
  loading: boolean;
};
