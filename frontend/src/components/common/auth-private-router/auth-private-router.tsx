import { RouteProps } from 'react-router-dom';
import { AuthWrapper, PrivateRoute } from 'components/common/common';

type Props = {
  component: React.ElementType;
} & RouteProps;

const AuthPrivateRouter: React.FC<Props> = ({ ...otherProps }) => {
  const Component: React.ElementType = otherProps.component;

  const WrappedComponent = (): JSX.Element => (
    <AuthWrapper>
      <Component />
    </AuthWrapper>
  );

  return <PrivateRoute {...otherProps} component={WrappedComponent} />;
};
export default AuthPrivateRouter;
