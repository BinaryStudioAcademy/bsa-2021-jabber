const getFileFromFileList  = (payload: FileList | null): File => {
  const [file] = payload ?? [];
  return file;
};

export { getFileFromFileList  };
