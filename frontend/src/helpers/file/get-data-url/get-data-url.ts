const getDataUrl = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.addEventListener(
      'load',
      () => {
        resolve(<string>fileReader.result);
      },
      {
        once: true,
      },
    );

    fileReader.addEventListener(
      'error',
      () => {
        reject(fileReader.error);
      },
      {
        once: true,
      },
    );

    fileReader.readAsDataURL(file);
  });
};

export { getDataUrl };
