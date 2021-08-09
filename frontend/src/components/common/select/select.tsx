import SelectReact from 'react-select';
import { Option } from 'common/types/types';
import { ErrorMessage } from '@hookform/error-message';
import {
  Control,
  FieldErrors,
  Path,
  FieldValues,
  useController,
} from 'react-hook-form';
import styles from './styles.module.scss';

type Props = {
  options: Option[];
  placeholder?: string;
  label: string;
  name: Path<FieldValues>;
  control: Control;
  errors: FieldErrors;
};

const Select: React.FC<Props> = ({ options, label, name, control, errors }) => {
  const { field } = useController({ name, control });

  const handleSelectChange = (option: Option | null):void => {
    field.onChange(option?.value);
  };

  const getCurrentValue = (options: Option[], value: string): Option | null => {
    return options.find((it) => it.value === value) ?? null;
  };

  return (
    <label className={styles.inputWrapper}>
      <span className={styles.label}>{label}</span>
      <SelectReact
        {...field}
        options={options}
        value={getCurrentValue(options,field.value)}
        onChange={handleSelectChange}
      />
      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export default Select;
