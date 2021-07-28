import { Resolver, ResolverResult } from 'react-hook-form';
import { Schema } from 'common/types/schema/schema';

export const getResolver = <FormPayload>(
  shema: Schema,
): Resolver<FormPayload> => {
  return (data): ResolverResult<FormPayload> => {
    const { error, value } = shema.validate(data, {
      abortEarly: false,
    });

    return {
      values: error ? {} : value,
      errors:
        error?.details.reduce((errorsData, error) => {
          return {
            ...errorsData,
            [error.path[0]]: error.message,
          };
        }, {}) ?? {},
    };
  };
};
