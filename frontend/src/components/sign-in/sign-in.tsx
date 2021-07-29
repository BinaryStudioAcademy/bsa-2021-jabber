import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { SignInPayload } from 'common/types/types';
import { AppRoute, ButtonType, DataStatus, InputType, LabelNames, UserCreatePayloadKey } from 'common/enums/enums';
import { SigninSchema } from 'validation-schemas/validation-schemas';
import { useAppSelector, useDispatch } from 'hooks/hooks';
import { auth as authActions } from 'store/actions';
import { getResolver } from 'helpers/form/form';
import styles from './styles.module.scss';
import logo from 'assets/img/logo-dark.svg';
import { Button, Input } from '../common/common';

const resolver = getResolver<SignInPayload>(SigninSchema);

const SignIn: React.FC = () => {
  const { register, handleSubmit } = useForm<SignInPayload>({ resolver });

  const { authStatus } = useAppSelector(({ auth }) => ({
    authStatus: auth.dataStatus,
  }));

  const dispatch = useDispatch();

  const isFormDisable = authStatus === DataStatus.PENDING;

  const onSubmit = (data: SignInPayload): void => {
    dispatch(authActions.signIn(data));
  };

  return (
    <section className={ styles.signInBlock }>
      <form onSubmit={handleSubmit(onSubmit)} className={ styles.formWrapper }>
        <img src={ logo } className={ styles.logo } width="103" height="30" loading="lazy" alt="" />
        <h2 className={styles.title}>Sign In</h2>
        <div className={styles.subTitle}><p>Don’t have an account? </p><Link to={AppRoute.SIGN_UP}>Sign Up</Link></div>
        <fieldset disabled={ isFormDisable } className={ styles.fieldset }>
          <div className={styles.formRow}>
            <Input
              label={LabelNames.EMAIL}
              type={InputType.EMAIL}
              registerData={register(UserCreatePayloadKey.EMAIL)}
              isRequire
            />
          </div>
          <div className={styles.formRow}>
            <Input
              label={LabelNames.PASSWORD}
              type={InputType.PASSWORD}
              registerData={register(UserCreatePayloadKey.PASSWORD)}
              isRequire
            />
          </div>
          <Button label="Sign In" type={ButtonType.SUBMIT} />
        </fieldset>
      </form>
    </section>
  );
};

export default SignIn;
