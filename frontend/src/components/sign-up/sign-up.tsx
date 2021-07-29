import { UserCreatePayload } from 'common/types/types';
import {
  ButtonType,
  DataStatus,
  InputType,
  UserCreatePayloadKey,
} from 'common/enums/enums';
import { auth as authActions } from 'store/actions';
import { useAppSelector, useDispatch, useState } from 'hooks/hooks';
import { Input, Button } from 'components/common/common';
import { DEFAULT_REGISTER_PAYLOAD } from './common/constants';

const SignUp: React.FC = () => {
  const [registerPayload, setRegisterPayload] = useState<UserCreatePayload>(
    DEFAULT_REGISTER_PAYLOAD,
  );
  const { authStatus } = useAppSelector(({ auth }) => ({
    authStatus: auth.dataStatus,
  }));
  const dispatch = useDispatch();

  const isFormDisable = authStatus === DataStatus.PENDING;

  const handleSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    dispatch(authActions.signUp(registerPayload));
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterPayload({
      ...registerPayload,
      [target.name]: target.value,
    });
  };

  return (
    <section>
      <h1>Sign Up ♊️</h1>

      <form onSubmit={handleSubmit}>
        <p>
          <Input
            label="First name"
            value={registerPayload.firstName}
            name={UserCreatePayloadKey.FIRST_NAME}
            isDisabled={isFormDisable}
            onChange={handleChange}
            isRequire
          />
        </p>
        <p>
          <Input
            label="Last name"
            value={registerPayload.lastName}
            name={UserCreatePayloadKey.LAST_NAME}
            isDisabled={isFormDisable}
            onChange={handleChange}
            isRequire
          />
        </p>
        <p>
          <Input
            label="Nickname"
            value={registerPayload.nickname}
            name={UserCreatePayloadKey.NICKNAME}
            isDisabled={isFormDisable}
            onChange={handleChange}
          />
        </p>
        <p>
          <Input
            label="Email"
            value={registerPayload.email}
            name={UserCreatePayloadKey.EMAIL}
            type={InputType.EMAIL}
            isDisabled={isFormDisable}
            onChange={handleChange}
            isRequire
          />
        </p>
        <p>
          <Input
            label="Birthdate"
            value={registerPayload.birthdate}
            name={UserCreatePayloadKey.BIRTHDATE}
            type={InputType.DATE}
            isDisabled={isFormDisable}
            onChange={handleChange}
            isRequire
          />
        </p>
        <p>
          <Button type={ButtonType.SUBMIT} label="Sign Up" />
        </p>
      </form>
    </section>
  );
};

export default SignUp;
