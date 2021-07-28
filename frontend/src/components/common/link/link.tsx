import { NavLink as AppLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';

type Props = {
  to: AppRoute;
  style: string;
};

const Link: React.FC<Props> = ({ children, to, style }) => (
  <AppLink to={to} className={style}>
    {children}
  </AppLink>
);

export default Link;
