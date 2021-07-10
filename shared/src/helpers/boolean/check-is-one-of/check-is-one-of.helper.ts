const checkIsOneOf = <T>(checkItem: T, ...checksItems: T[]): boolean => {
  return checksItems.some((item) => item === checkItem);
};

export { checkIsOneOf };
