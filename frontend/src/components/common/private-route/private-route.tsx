import { RouteProps, RouteComponentProps } from 'react-router-dom';
import { Redirect, Route } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { useAppSelector } from 'hooks/hooks';

type Props = RouteProps & {
  redirectTo?: AppRoute,
  component: React.ComponentType<RouteComponentProps<Record<string, string | undefined>>>,
};

const PrivateRoute: React.FC<Props> = ({ component: Component, redirectTo = AppRoute.SIGN_IN, ...otherProps }) => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));
  const hasUser = Boolean(user);

  return (
    <Route {...otherProps} render={(props): React.ReactNode => {
      return hasUser
        ? <Component {...props} />
        : <Redirect to={redirectTo} />;
    }}/>
  );
};

export default PrivateRoute;
