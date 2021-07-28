import { CheckboxStyle, InputType } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  label: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  useStyle?: CheckboxStyle;
  isRequire?: boolean;
  isDisabled?: boolean;
  isChecked?: boolean;
};

const Checkbox: React.FC<Props> = ({
  useStyle = '',
  isRequire = false,
  isDisabled = false,
  isChecked = false,
  label,
  name,
  onChange,
}) => (
  <label className={`${styles.checkbox} ${styles[useStyle]}`}>
    <input
      type={InputType.CHECKBOX}
      name={name}
      onChange={onChange}
      required={isRequire}
      disabled={isDisabled}
      checked={isChecked}
    />
    <span>{label}</span>
  </label>
);

export default Checkbox;
