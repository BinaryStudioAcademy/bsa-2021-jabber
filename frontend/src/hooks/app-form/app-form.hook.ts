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
import { FormEvent } from 'common/enums/enums';

type useAppFormProps = {
  defaultValues: Record<string, unknown>;
  validationSchema?: ValidationSchema;
  modeAction?: FormEvent.ON_SUBMIT | FormEvent.ON_CHANGE;
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
  modeAction = FormEvent.ON_SUBMIT,
}: useAppFormProps): useAppFormReturn => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<FieldValues>({
    defaultValues,
    resolver: validationSchema ? getFormResolver(validationSchema) : undefined,
    mode: modeAction,
  });

  return { control, register, errors, handleSubmit, getValues };
};

export { useAppForm };
