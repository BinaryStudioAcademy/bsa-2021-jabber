import {
  Control,
  FieldErrors,
  useController,
  Path,
  FieldValues,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { InputType } from 'common/enums/enums';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';

type Props = {
  type?: InputType;
  placeholder?: string;
  label: string;
  name: Path<FieldValues>;
  control: Control;
  errors: FieldErrors;
  hasMultipleRows?: boolean;
} & (
  | React.InputHTMLAttributes<HTMLInputElement>
  | React.TextareaHTMLAttributes<HTMLTextAreaElement>
);

const Input: React.FC<Props> = ({
  label,
  name,
  control,
  errors,
  placeholder = '',
  type = InputType.TEXT,
  hasMultipleRows = false,
  ...options
}) => {
  const { field } = useController({ name, control });

  return (
    <label className={styles.inputWrapper}>
      <span className={styles.label}>{label}</span>
      {hasMultipleRows ? (
        <textarea
          {...field}
          {...(options as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          placeholder={placeholder}
          className={getAllowedClasses(styles.input, styles.textarea)}
        />
      ) : (
        <input
          {...field}
          {...(options as React.InputHTMLAttributes<HTMLInputElement>)}
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
