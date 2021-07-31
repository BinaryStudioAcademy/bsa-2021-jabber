import { Link } from 'react-router-dom';
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
import styles from '../sign-in-form/styles.module.scss';
import logo from 'assets/img/logo-dark.svg';
import { Button, Input } from '../common/common';
import { DEFAULT_LOGIN_PAYLOAD } from './common/constants';

type Props = {
  onSubmit: (payload: UserSignInPayload) => void;
};

const SignIn: React.FC<Props> = ({ onSubmit }) => {

  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: signInValidationSchema,
    defaultValues: DEFAULT_LOGIN_PAYLOAD,
  });

  const { authStatus } = useAppSelector(({ auth }) => ({
    authStatus: auth.dataStatus,
  }));

  const isFormDisable = authStatus === DataStatus.PENDING;

  return (
    <div className={styles.signIn}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <img
          src={logo}
          className={styles.formLogo}
          width="140"
          height="50"
          loading="lazy"
          alt="Jabber logo"
        />
        <h1 className={styles.formTitle}>Sign Up</h1>
        <div className={styles.formSubtitle}>
          Don’t have an account?
          <Link to={AppRoute.SIGN_UP}>Sign Up</Link>
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
          <Button label="Sign In" type={ButtonType.SUBMIT}/>
        </fieldset>
      </form>
    </div>
  );
};

export default SignIn;
