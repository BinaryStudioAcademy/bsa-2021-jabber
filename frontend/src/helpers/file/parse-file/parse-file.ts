const parseFile = (payload: FileList | null): File => {
  const [file] = payload ?? [];
  return file;
};

export { parseFile };
