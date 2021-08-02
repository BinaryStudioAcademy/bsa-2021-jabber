import { ErrorMessage } from '@hookform/error-message';
import {
  Control,
  FieldErrors,
  useController,
  Path,
  FieldValues,
} from 'react-hook-form';

import styles from './styles.module.scss';

type Props = {
  selectItems: Array<string>,
  placeholder?: string;
  label: string;
  name: Path<FieldValues>;
  control: Control;
  errors: FieldErrors;
};

const Select: React.FC<Props> = ({
  selectItems = [],
  label,
  name,
  control,
  errors,
  placeholder = '',
}) => {
  const { field } = useController({ name, control });

  return (
    <label className={styles.inputWrapper}>
      <span className={styles.label}>{label}</span>
      <select
        {...field}
        placeholder={placeholder}
        className={styles.input}
      >
        { selectItems.map((item: string) => <option key={item}>{ item }</option>) }
      </select>
      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export default Select;
