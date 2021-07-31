import { UserCreatePayload } from 'common/types/types';
import {
  AppRoute,
  ButtonType,
  DataStatus,
  InputType,
  UserCreatePayloadKey,
} from 'common/enums/enums';
import { signUp as signUpValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import { Button, Input, Link } from 'components/common/common';
import { DEFAULT_REGISTER_PAYLOAD } from './common/constants';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: UserCreatePayload) => void;
};

const SignUpForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: signUpValidationSchema,
    defaultValues: DEFAULT_REGISTER_PAYLOAD,
  });

  const { authStatus } = useAppSelector(({ auth }) => ({
    authStatus: auth.dataStatus,
  }));

  const isFormDisable = authStatus === DataStatus.PENDING;

  return (
    <div className={styles.signUp}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.formTitle}>Sign Up</h1>
        <div className={styles.formSubtitle}>
          Already have an account?
          <Link to={AppRoute.SIGN_IN} className={styles.link}>
            {' '}
            Sign In
          </Link>
        </div>
        <fieldset disabled={isFormDisable} className={styles.fieldset}>
          <Input
            label="First name"
            placeholder="Enter your name"
            name={UserCreatePayloadKey.FIRST_NAME}
            control={control}
            errors={errors}
          />
          <Input
            label="Last name"
            placeholder="Enter your last name"
            name={UserCreatePayloadKey.LAST_NAME}
            control={control}
            errors={errors}
          />
          <Input
            label="Nickname"
            placeholder="Enter your nickname"
            name={UserCreatePayloadKey.NICKNAME}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.EMAIL}
            label="Email"
            placeholder="Enter your email"
            name={UserCreatePayloadKey.EMAIL}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.PASSWORD}
            label="Password"
            placeholder="Enter your password"
            name={UserCreatePayloadKey.PASSWORD}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.DATE}
            label="Birthdate"
            name={UserCreatePayloadKey.BIRTHDATE}
            control={control}
            errors={errors}
          />
          <Button
            label="Sign Up"
            className={styles.button}
            type={ButtonType.SUBMIT}
          />
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpForm;
