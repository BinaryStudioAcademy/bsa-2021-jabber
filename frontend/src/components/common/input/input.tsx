import Icon from 'components/common/icon/icon';

import { IconName, InputType } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  label?: string;
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: InputType;
  isRequire?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  iconName?: IconName;
};

const Input: React.FC<Props> = ({
  type = InputType.TEXT,
  isRequire = false,
  isDisabled = false,
  placeholder = '',
  label = '',
  value,
  name,
  onChange,
  iconName,
}) => (
  <label className={styles.input}>
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
    {iconName ? <Icon iconName={iconName} /> : null}
  </label>
);

export default Input;
