import { InputType } from 'common/enums/enums';

type Props = {
  label: string;
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: InputType;
  isRequire?: boolean;
  isDisabled?: boolean;
};

const Input: React.FC<Props> = ({
  type = InputType.TEXT,
  isRequire = false,
  isDisabled = false,
  label,
  value,
  name,
  onChange,
}) => (
  <label>
    {label}
    <input
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      required={isRequire}
      disabled={isDisabled}
    />
  </label>
);

export default Input;
