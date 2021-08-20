import {
  Control,
  FieldErrors,
  FieldValues,
  useForm,
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { ValidationSchema } from 'common/types/types';
import { getFormResolver } from 'helpers/helpers';
import { FormEvent } from 'common/enums/enums';

type useAppFormProps = {
  defaultValues: Record<string, unknown>;
  validationSchema?: ValidationSchema;
  modeAction?: FormEvent;
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
};

const useAppForm = ({
  validationSchema,
  defaultValues,
  modeAction = FormEvent.ON_SUBMIT,
}: useAppFormProps): useAppFormReturn => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    getValues,
    setValue,
  } = useForm<FieldValues>({
    defaultValues,
    resolver: validationSchema ? getFormResolver(validationSchema) : undefined,
    mode: modeAction,
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
  };
};

export { useAppForm };
