import { Path, UseFormRegister } from 'react-hook-form';
import { InputType } from 'common/enums/enums';
import { UserCreatePayload } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  label: Path<UserCreatePayload>;
  register: UseFormRegister<UserCreatePayload>;
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
  register,
}) => (
  <label className={styles.inputWrapper}>
    <span className={styles.label}>{label}</span>
    <input
      className={styles.input}
      type={type}
      {...register(label)}
      required={isRequire}
      disabled={isDisabled}
      placeholder={placeholder}
    />
  </label>
);

export default Input;
