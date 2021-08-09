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
import { useState } from 'hooks/hooks';
import { FIRST_ARRAY_IDX } from 'jabber-shared/common/constants/constants';
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

  const [val, setVal] = useState(options[FIRST_ARRAY_IDX]);

  const changeHandler = (event: Option | null): void => {
    if(event){
      setVal(event);
      field.onChange(event.label);
    }    
  };

  return (
    <label className={styles.inputWrapper}>
      <span className={styles.label}>{label}</span>
      <SelectReact
        {...field}
        options={options}
        value={val}
        onChange={changeHandler}
      />
      <span className={styles.errorWrapper}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export default Select;
