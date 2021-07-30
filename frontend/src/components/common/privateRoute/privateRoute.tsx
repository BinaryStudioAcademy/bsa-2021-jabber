import React from 'react';
import { Redirect, RouteProps, RouteComponentProps, Route } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import { useAppSelector } from 'hooks/hooks';

type IRouteProps = RouteProps & {
  redirectTo?: AppRoute,
  component: React.ComponentType<RouteComponentProps<Record<string, string | undefined>>>,
};

const PrivateRoute: React.FC<IRouteProps> = ({ component: Component, redirectTo = AppRoute.ANY, ...otherProps }) => {
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
