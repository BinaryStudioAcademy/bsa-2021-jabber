const extractAuthToken = (header?: string): string | null => {
  const [, token] = String(header).split(' ');
  return token ?? null;
};

export { extractAuthToken };
