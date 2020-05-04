export const flushPromise = async (): Promise<unknown> => {
  return new Promise<unknown>((resolve: (value?: unknown) => void): NodeJS.Immediate => setImmediate(resolve));
};
