const { REACT_APP_API_ORIGIN_URL, REACT_APP_SOCKET_SERVER } = process.env;

const ENV = {
  API_PATH: REACT_APP_API_ORIGIN_URL ?? '',
  SOCKET_SERVER: REACT_APP_SOCKET_SERVER ?? '',
} as const;

export { ENV };
