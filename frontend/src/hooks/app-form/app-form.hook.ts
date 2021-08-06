import {
  Control,
  FieldErrors,
  FieldValues,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { ValidationSchema } from 'common/types/types';
import { getFormResolver } from 'helpers/helpers';
import { Events } from 'common/enums/enums';

type useAppFormProps = {
  defaultValues: { [key: string]: string | number };
  validationSchema?: ValidationSchema;
  modeAction?: Events.ON_SUBMIT | Events.ON_CHANGE;
};

type useAppFormReturn = {
  control: Control;
  errors: FieldErrors;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
};

const useAppForm = ({
  validationSchema,
  defaultValues,
  modeAction = Events.ON_SUBMIT,
}: useAppFormProps): useAppFormReturn => {
  const resolver = validationSchema ? getFormResolver(validationSchema) : undefined;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues,
    resolver,
    mode: modeAction,
  });

  return { control, errors, handleSubmit };
};

export { useAppForm };
