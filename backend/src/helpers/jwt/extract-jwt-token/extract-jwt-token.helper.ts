const extractJwtToken = (header: string): string => {
  const [, token] = header.split(' ');
  return token;
};

export { extractJwtToken };
