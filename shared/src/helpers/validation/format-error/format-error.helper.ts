import { ValidationError } from 'joi';

type FormattedError = {
  [key: string]: string;
};

export const formatError = (error: ValidationError): FormattedError => {
  const formattedError = error?.details.reduce((errorsData, error) => {
    return {
      ...errorsData,
      [error.path[0]]: error.message,
    };
  }, {});

  return formattedError ?? {};
};
