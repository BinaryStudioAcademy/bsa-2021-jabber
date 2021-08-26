import { AppRoute } from 'common/enums/enums';
import { auth as authActions } from 'store/actions';
import { UserCreatePayload, UserSignInPayload, UserResetPasswordPayload } from 'common/types/types';
import { DateFormatType } from 'common/enums/enums';
import { useAppSelector, useDispatch, useLocation } from 'hooks/hooks';
import { Redirect } from 'components/common/common';
import logo from 'assets/img/logo-dark.svg';
import { SignInForm, SignUpForm, ResetPasswordForm } from './components/components';
import { getFormattedDate } from 'helpers/helpers';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const hasUser = Boolean(user);

  const handleSignUpSubmit = (payload: UserCreatePayload): void => {
    dispatch(
      authActions.signUp({
        ...payload,
        birthdate: getFormattedDate(
          new Date(payload.birthdate),
          DateFormatType.ISO_DATE_000Z,
        ),
      }),
    );
  };

  const handleSignInSubmit = (payload: UserSignInPayload): void => {
    dispatch(authActions.signIn(payload));
  };

  const handleResetPasswordSubmit = (payload: UserResetPasswordPayload): void => {
    // dispatch(authActions.signIn(payload));
    // eslint-disable-next-line no-console
    console.log(payload);
  };

  const getScreen = (screen: string): React.ReactElement | null => {
    switch (screen) {
      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case AppRoute.RESET_PASSWORD: {
        return <ResetPasswordForm onSubmit={handleResetPasswordSubmit} />;
      }
    }

    return null;
  };

  if (hasUser) {
    return <Redirect to={AppRoute.ROOT} />;
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.formWrapper}>
        <img
          src={logo}
          className={styles.formLogo}
          width="140"
          height="50"
          loading="lazy"
          alt="Jabber logo"
        />
        {getScreen(pathname)}
      </div>
    </div>
  );
};

export default Auth;
