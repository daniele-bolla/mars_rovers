type CaseHandlers<T extends string | number | symbol, R> = {
  [K in T]?: (value: T) => R;
};

export const switchCases = <T extends string | number | symbol, R>(
  value: T,
  caseHandlers: CaseHandlers<T, R>,
  defaultHandler: (value: T) => R
): R => {
  const handler = caseHandlers[value];
  if (handler) {
    return handler(value);
  }
  return defaultHandler(value);
};