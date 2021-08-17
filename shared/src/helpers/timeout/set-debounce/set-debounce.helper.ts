// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DebounceCallbackType = (...args: any[]) => void;

const setDebounce = (
  fn: DebounceCallbackType,
  delay: number,
): DebounceCallbackType => {
  let timeout: ReturnType<typeof setTimeout>;

  return <T>(...args: T[]): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.call(null, ...args), delay);
  };
};

export { setDebounce };
