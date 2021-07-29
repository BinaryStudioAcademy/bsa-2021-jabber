import { useForm } from 'react-hook-form';
import { UserCreatePayload } from 'common/types/types';
import {
  AppRoute,
  ButtonType,
  DataStatus,
  InputType,
  UserCreatePayloadKey,
} from 'common/enums/enums';
import { SignupSchema } from 'validation-schemas/validation-schemas';
import { useAppSelector, useDispatch } from 'hooks/hooks';
import { auth as authActions } from 'store/actions';
import { Button, Input, Link } from 'components/common/common';
import { getResolver } from 'helpers/form/form';
import logo from 'assets/img/logo-dark.svg';
import styles from './styles.module.scss';

const resolver = getResolver<UserCreatePayload>(SignupSchema);

const SignUp: React.FC = () => {
  const { register, handleSubmit } = useForm<UserCreatePayload>({ resolver });

  const { authStatus } = useAppSelector(({ auth }) => ({
    authStatus: auth.dataStatus,
  }));

  const dispatch = useDispatch();

  const isFormDisable = authStatus === DataStatus.PENDING;

  const onSubmit = (data: UserCreatePayload): void => {
    dispatch(authActions.signUp(data));
  };

  return (
    <div className={styles.signUpPage}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <img
          src={logo}
          className={styles.formLogo}
          loading="lazy"
          alt="Jabber logo"
        />
        <h3 className={styles.formTitle}>Sign Up</h3>
        <div className={styles.formSubtitle}>
          Already have an account?
          <Link to={AppRoute.SIGN_IN}>Sign In</Link>
        </div>
        <fieldset disabled={isFormDisable} className={styles.fieldset}>
          <div className={styles.formRow}>
            <Input
              label={UserCreatePayloadKey.FIRST_NAME}
              registerData={register(UserCreatePayloadKey.FIRST_NAME)}
              isRequire
            />
          </div>
          <div className={styles.formRow}>
            <Input
              label={'last name'}
              registerData={register(UserCreatePayloadKey.LAST_NAME)}
              isRequire
            />
          </div>
          <div className={styles.formRow}>
            <Input
              label={UserCreatePayloadKey.NICKNAME}
              registerData={register(UserCreatePayloadKey.NICKNAME)}
              isRequire
            />
          </div>
          <div className={styles.formRow}>
            <Input
              label={UserCreatePayloadKey.EMAIL}
              type={InputType.EMAIL}
              registerData={register(UserCreatePayloadKey.EMAIL)}
              isRequire
            />
          </div>
          <div className={styles.formRow}>
            <Input
              label={UserCreatePayloadKey.PASSWORD}
              type={InputType.PASSWORD}
              registerData={register(UserCreatePayloadKey.PASSWORD)}
              isRequire
            />
          </div>
          <div className={styles.formRow}>
            <Input
              label={UserCreatePayloadKey.BIRTHDATE}
              type={InputType.DATE}
              registerData={register(UserCreatePayloadKey.BIRTHDATE)}
              isRequire
            />
          </div>
          <Button label="Sign Up" type={ButtonType.SUBMIT} />
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
