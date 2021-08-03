const getDataUrl = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = (): void => resolve(<string>fileReader.result);
    fileReader.readAsDataURL(file);
  });
};

export { getDataUrl };
