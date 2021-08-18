import {
  Control,
  FieldErrors,
  FieldValues,
  useForm,
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormGetValues,
  UseFormReset,
  UseFormSetError,
  UseFormSetValue,
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
  isSubmitSuccessful: boolean;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  reset: UseFormReset<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  setError: UseFormSetError<FieldValues>;
};

const useAppForm = ({
  validationSchema,
  defaultValues,
}: useAppFormProps): useAppFormReturn => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    getValues,
    setValue,
    setError,
  } = useForm<FieldValues>({
    defaultValues,
    resolver: getFormResolver(validationSchema),
    mode: 'onSubmit',
  });

  return {
    control,
    register,
    errors,
    handleSubmit,
    getValues,
    reset,
    isSubmitSuccessful,
    setValue,
    setError,
  };
};

export { useAppForm };
