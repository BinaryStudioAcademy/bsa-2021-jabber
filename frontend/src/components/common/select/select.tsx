import SelectReact from 'react-select';
import { ErrorMessage } from '@hookform/error-message';
import { Control, FieldErrors, Path, FieldValues } from 'react-hook-form';
import styles from './styles.module.scss';

type Props = {
  options: string[];
  placeholder?: string;
  label: string;
  name: Path<FieldValues>;
  control: Control;
  errors: FieldErrors;
};

type Options = {
  label: string;
  value: string;
};

const Select: React.FC<Props> = ({ options, label, name, control, errors }) => {
  const optionsItems:Options[] = options.map((item, index) => {
    return { label: item, value: index.toString() };
  });

  return (
    <label className={styles.inputWrapper}>
      <span className={styles.label}>{label}</span>
      <SelectReact
        control={control}
        options={optionsItems}
        className={styles.input}
        isSearchable={false}
        name={name}
      />
      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export default Select;
