import {
  Control,
  FieldErrors,
  FieldValues,
  useForm,
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormGetValues,
} from 'react-hook-form';
import { ValidationSchema } from 'common/types/types';
import { getFormResolver } from 'helpers/helpers';

type useAppFormProps = {
  defaultValues: Record<string, unknown>;
  validationSchema: ValidationSchema;
};

type useAppFormReturn = {
  control: Control;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
};

const useAppForm = ({
  validationSchema,
  defaultValues,
}: useAppFormProps): useAppFormReturn => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<FieldValues>({
    defaultValues,
    resolver: getFormResolver(validationSchema),
    mode: 'onSubmit',
  });

  return { control, register, errors, handleSubmit, getValues };
};

export { useAppForm };
