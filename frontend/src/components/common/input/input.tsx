import {
  Control,
  FieldErrors,
  useController,
  Path,
  FieldValues,
} from 'react-hook-form';
import { InputType } from 'common/enums/enums';

type Props = {
  type?: InputType;
  label: string;
  name: Path<FieldValues>;
  control: Control;
  errors: FieldErrors;
};

const Input: React.FC<Props> = ({
  label,
  name,
  control,
  type = InputType.TEXT,
}) => {
  const { field } = useController({ name, control });

  return (
    <label>
      {label}
      <input {...field} type={type} />
    </label>
  );
};

export default Input;
