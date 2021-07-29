import { UseFormRegisterReturn } from 'react-hook-form';
import { InputType, LabelNames } from 'common/enums/enums';

type Props = {
  label: LabelNames;
  type?: InputType;
  isRequire?: boolean;
  isDisabled?: boolean;
  registerData?: UseFormRegisterReturn;
};

const Input: React.FC<Props> = ({
  type = InputType.TEXT,
  isRequire = false,
  isDisabled = false,
  label,
  registerData = {},
}) => (
  <label>
    {label}
    <input
      type={type}
      {...registerData}
      required={isRequire}
      disabled={isDisabled}
    />
  </label>
);

export default Input;
