const getFileExtension = (file: File | undefined): string | undefined => {
  return file ? file.name.split('.').pop() : undefined;
};

export { getFileExtension };
