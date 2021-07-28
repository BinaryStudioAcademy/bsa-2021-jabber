import { InputType } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  label: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  isRequire?: boolean;
  isDisabled?: boolean;
  isChecked?: boolean;
};

const Checkbox: React.FC<Props> = ({
  isRequire = false,
  isDisabled = false,
  isChecked = false,
  label,
  name,
  onChange,
}) => (
  <label className={styles.checkbox}>
    <input
      type={InputType.CHECKBOX}
      name={name}
      onChange={onChange}
      required={isRequire}
      disabled={isDisabled}
      checked={isChecked}
    />
    {label}
  </label>
);

export default Checkbox;
