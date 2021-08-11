import SelectReact, { StylesConfig } from 'react-select';
import { Option } from 'common/types/types';
import { ErrorMessage } from '@hookform/error-message';
import {
  Control,
  FieldErrors,
  Path,
  FieldValues,
  useController,
} from 'react-hook-form';
import { getCurrentValue } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  options: Option[];
  placeholder?: string;
  label: string;
  name: Path<FieldValues>;
  control: Control;
  errors: FieldErrors;
};

type OptionType = {
  label: string;
  value: string;
};

const customStyles: StylesConfig<OptionType, false> = {
  control: (provided) => ({
    ...provided,
    border: 'none',
    padding: '5px 12px',
    cursor: 'pointer',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    width: 0,
  }),
};

const Select: React.FC<Props> = ({ options, label, name, control, errors }) => {
  const { field } = useController({ name, control });

  const handleSelectChange = (option: Option | null): void => {
    field.onChange(option?.value);
  };

  const currentValue = getCurrentValue(options, field.value);

  return (
    <label className={styles.inputWrapper}>
      <span className={styles.label}>{label}</span>
      <SelectReact
        styles={customStyles}
        {...field}
        options={options}
        value={currentValue}
        onChange={handleSelectChange}
      />

      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export default Select;
