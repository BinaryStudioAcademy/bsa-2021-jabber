import { ErrorMessage } from '@hookform/error-message';
import {
  Control,
  FieldErrors,
  useController,
  Path,
  FieldValues,
} from 'react-hook-form';
import { IconName, InputType } from 'common/enums/enums';
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
  icon?: IconName;
  className?: string;
};

const Input: React.FC<Props> = ({
  label,
  name,
  control,
  errors,
  placeholder = '',
  type = InputType.TEXT,
  hasMultipleRows = false,
  icon ,
  className,
}) => {
  const { field } = useController({ name, control });

  return (
    <label className={styles.inputWrapper}>
      <span className={styles.label}>{label}</span>
      {hasMultipleRows ? (
        <textarea
          {...field}
          placeholder={placeholder}
          className={getAllowedClasses(styles.input, styles.textarea)}
        />
      ) : (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className={getAllowedClasses(
            className,
            styles.input,
            styles[`icon--${icon}`],
          )}
        />)}
      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export default Input;
