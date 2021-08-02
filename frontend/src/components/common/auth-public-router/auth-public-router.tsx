import { RouteProps } from 'react-router-dom';
import { Route } from 'components/common/common';
import { AuthWrapper } from 'components/common/common';

type Props = {
  component: React.ElementType;
} & RouteProps;

const AuthPublicRouter: React.FC<Props> = ({ ...otherProps }) => {
  const Component: React.ElementType = otherProps.component;

  const WrappedComponent = (): JSX.Element => (
    <AuthWrapper>
      <Component />
    </AuthWrapper>
  );

  return <Route {...otherProps} component={WrappedComponent} />;
};

export default AuthPublicRouter;
