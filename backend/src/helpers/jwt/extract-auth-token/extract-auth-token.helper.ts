const extractAuthToken = (header: string): string => {
  const [, token] = header.split(' ');
  return token;
};

export { extractAuthToken };
