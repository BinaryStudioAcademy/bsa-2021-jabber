import { Resolver } from 'react-hook-form';
import { ValidationSchema } from 'common/types/schema/schema';
import { formatValidationError } from 'helpers/validation/validation';

export const getResolver = <FormPayload>(
  shema: ValidationSchema,
): Resolver<FormPayload> => {
  const resolver: Resolver<FormPayload> = (data) => {
    const { error, value } = shema.validate(data, {
      abortEarly: false,
    });

    return {
      values: error ? {} : value,
      errors: error ? formatValidationError(error) : {},
    };
  };

  return resolver;
};
