import { UserSignInPayload } from 'common/types/types';
import {
  AppRoute,
  ButtonType,
  DataStatus,
  InputType,
  UserSignInPayloadKey,
} from 'common/enums/enums';
import { signIn as signInValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import styles from './styles.module.scss';
import { Button, Input, Link } from 'components/common/common';
import { DEFAULT_LOGIN_PAYLOAD } from './common/constants';

type Props = {
  onSubmit: (payload: UserSignInPayload) => void;
};

const SignInForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: signInValidationSchema,
    defaultValues: DEFAULT_LOGIN_PAYLOAD,
  });

  const { authStatus } = useAppSelector(({ auth }) => ({
    authStatus: auth.dataStatus,
  }));

  const isFormDisable = authStatus === DataStatus.PENDING;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.formTitle}>Sign In</h1>
      <div className={styles.formSubtitle}>
        Don’t have an account?
        <Link to={AppRoute.SIGN_UP} className={styles.link}>
          {' '}
          Sign Up
        </Link>
      </div>
      <fieldset disabled={isFormDisable} className={styles.fieldset}>
        <Input
          type={InputType.EMAIL}
          label="Email"
          placeholder="Enter your email"
          name={UserSignInPayloadKey.EMAIL}
          control={control}
          errors={errors}
        />
        <Input
          type={InputType.PASSWORD}
          label="Password"
          placeholder="Enter your password"
          name={UserSignInPayloadKey.PASSWORD}
          control={control}
          errors={errors}
        />
        <Button label="Sign In" type={ButtonType.SUBMIT} />
      </fieldset>
    </form>
  );
};

export default SignInForm;
