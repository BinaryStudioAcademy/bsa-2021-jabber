import { FileExtension } from 'common/enums/enums';

const Extension = {
  START: '.',
  SEPARATOR: ', ',
};

const getFileExtensions = (...extensions: FileExtension[]): string => {
  return extensions.map((it) => Extension.START + it).join(Extension.SEPARATOR);
};

export { getFileExtensions };
