const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text);
};

export { copyToClipboard };
