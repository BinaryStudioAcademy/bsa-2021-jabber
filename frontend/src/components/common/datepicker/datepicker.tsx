import DatePicker from 'react-datepicker';
import { ErrorMessage } from '@hookform/error-message';
import {
  Control,
  Path,
  FieldValues,
  FieldErrors,
  useController,
} from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.module.scss';

type Props = {
  label: string;
  name: Path<FieldValues>;
  control: Control;
  errors: FieldErrors;
};

const Datepicker: React.FC<Props> = ({
  label,
  name,
  control,
  errors,
}) => {

  const { field } = useController({ name, control });

  return (
    <label className={styles.datePikerWrapper}>
      <span className={styles.label}>{label}</span>
      <DatePicker
        placeholderText="dd/mm/yyyy"
        showYearDropdown
        dropdownMode="select"
        dateFormat="dd/MM/yyyy"
        className={styles.datePicker}
        selected={field.value}
        onChange={(date): void => field.onChange(date)}
      />
      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export default Datepicker;
