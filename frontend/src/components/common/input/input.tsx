import { InputType } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  label: string;
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: InputType;
  isRequire?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
};

const Input: React.FC<Props> = ({
  type = InputType.TEXT,
  isRequire = false,
  isDisabled = false,
  placeholder = '',
  label,
  value,
  name,
  onChange,
}) => (
  <label className={styles.inputWrapper}>
    {label}
    <input
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      required={isRequire}
      disabled={isDisabled}
      placeholder={placeholder}
    />
  </label>
);

export default Input;
