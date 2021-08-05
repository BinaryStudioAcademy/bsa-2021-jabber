const extractAuthToken = (header: string | undefined): string | null => {
  const [, token] = String(header).split(' ');
  return token ?? null;
};

export { extractAuthToken };
