import { ErrorMessage } from '@hookform/error-message';
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
  hasMultipleRows?: boolean;
};

const Input: React.FC<Props> = ({
  label,
  name,
  control,
  errors,
  placeholder = '',
  type = InputType.TEXT,
  hasMultipleRows = false,
}) => {
  const { field } = useController({ name, control });

  return (
    <label className={styles.inputWrapper}>
      <span className={styles.label}>{label}</span>
      {hasMultipleRows ? (
        <textarea
          {...field}
          placeholder={placeholder}
          className={styles.textarea}
        />
      ) : (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className={styles.input}
        />
      )}

      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export default Input;
