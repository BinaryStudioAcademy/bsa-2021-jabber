import { UserCreatePayload } from 'common/types/types';
import {
  AppRoute,
  ButtonType,
  DataStatus,
  InputType,
  UserPayloadKey,
} from 'common/enums/enums';
import { signUp as signUpValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import { Button, Input, Link, Datepicker } from 'components/common/common';
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

  const isFormDisabled = authStatus === DataStatus.PENDING;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.formTitle}>Sign Up</h1>
      <div className={styles.formSubtitle}>
        Already have an account?
        <Link to={AppRoute.SIGN_IN} className={styles.link}>
          {' '}
          Sign In
        </Link>
      </div>
      <fieldset disabled={isFormDisabled} className={styles.fieldset}>
        <Input
          label="First name"
          placeholder="Enter your name"
          name={UserPayloadKey.FIRST_NAME}
          control={control}
          errors={errors}
        />
        <Input
          label="Last name"
          placeholder="Enter your last name"
          name={UserPayloadKey.LAST_NAME}
          control={control}
          errors={errors}
        />
        <Input
          label="Nickname"
          placeholder="Enter your nickname"
          name={UserPayloadKey.NICKNAME}
          control={control}
          errors={errors}
        />
        <Input
          type={InputType.EMAIL}
          label="Email"
          placeholder="Enter your email"
          name={UserPayloadKey.EMAIL}
          control={control}
          errors={errors}
        />
        <Input
          type={InputType.PASSWORD}
          label="Password"
          placeholder="Enter your password"
          name={UserPayloadKey.PASSWORD}
          control={control}
          errors={errors}
        />
        <Datepicker
          label="Birthdate"
          name={UserPayloadKey.BIRTHDATE}
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
  );
};

export default SignUpForm;
