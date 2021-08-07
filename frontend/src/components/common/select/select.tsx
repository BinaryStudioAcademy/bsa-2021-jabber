import SelectReact from 'react-select';
import { Option } from 'common/types/types';
import { ErrorMessage } from '@hookform/error-message';
import { Control, FieldErrors, Path, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
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
  return (
    <label className={styles.inputWrapper}>
      <span className={styles.label}>{label}</span>
      <Controller
        name={name}
        control={control}
        render={({ field }): any => (
          <SelectReact {...field} options={options} />
        )}
      />

      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export default Select;
