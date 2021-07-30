import {
  Control,
  FieldErrors,
  useController,
  Path,
  FieldValues,
} from 'react-hook-form';
import { InputType } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  type?: InputType;
  placeholder?: string;
  label: string;
  name: Path<FieldValues>;
  control: Control;
  errors: FieldErrors;
};

const Input: React.FC<Props> = ({
  label,
  name,
  control,
  placeholder = '',
  type = InputType.TEXT,
}) => {
  const { field } = useController({ name, control });

  return (
    <label className={styles.inputWrapper}>
      <span className={styles.label}>{label}</span>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={styles.input}
      />
    </label>
  );
};

export default Input;
