import { AppRoute } from 'common/enums/enums';
import { auth as authActions } from 'store/actions';
import { UserCreatePayload } from 'common/types/types';
import SignInForm from 'components/sign-in-form/sign-in-form';
import SignUpForm from 'components/sign-up-form/sign-up-form';
import { useDispatch } from 'hooks/hooks';

type AuthProps = {
  screen: AppRoute.SIGN_UP | AppRoute.SIGN_IN;
};

const Auth: React.FC<AuthProps> = ({ screen }) => {
  const dispatch = useDispatch();

  const handleSignUpSubmit = (data: UserCreatePayload): void => {
    dispatch(authActions.signUp(data));
  };

  const handleSignInSubmit = (): void => {
    // handleSignInSubmit
  };

  const getScreen = (): React.ReactElement | null => {
    switch (screen) {
      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
    }
  };

  return <>{getScreen()}</>;
};

export default Auth;
