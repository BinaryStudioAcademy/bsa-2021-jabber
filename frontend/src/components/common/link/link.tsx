import { NavLink as AppLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';

type Props = {
  to: AppRoute;
};

const Link: React.FC<Props> = ({ children, to }) => (
  <AppLink to={to}>{children}</AppLink>
);

export default Link;
