import {
  Control,
  FieldErrors,
  FieldValues,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { ValidationSchema } from 'common/types/types';
import { getFormResolver } from 'helpers/helpers';

type useAppFormProps = {
  defaultValues: { [key: string]: string | number | FileList };
  validationSchema: ValidationSchema;
};

type useAppFormReturn = {
  control: Control;
  errors: FieldErrors;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
};

const useAppForm = ({
  validationSchema,
  defaultValues,
}: useAppFormProps): useAppFormReturn => {
  const resolver = getFormResolver(validationSchema);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues,
    resolver,
    mode: 'onSubmit',
  });

  return { control, errors, handleSubmit };
};

export { useAppForm };
