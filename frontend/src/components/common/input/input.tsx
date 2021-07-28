import { Path, UseFormRegister } from 'react-hook-form';
import { InputType } from 'common/enums/enums';
import { UserCreatePayload } from 'common/types/types';

type Props = {
  label: Path<UserCreatePayload>;
  register: UseFormRegister<UserCreatePayload>;
  type?: InputType;
  isRequire?: boolean;
  isDisabled?: boolean;
};

const Input: React.FC<Props> = ({
  type = InputType.TEXT,
  isRequire = false,
  isDisabled = false,
  label,
  register,
}) => (
  <label>
    {label}
    <input
      type={type}
      {...register(label)}
      required={isRequire}
      disabled={isDisabled}
    />
  </label>
);

export default Input;
