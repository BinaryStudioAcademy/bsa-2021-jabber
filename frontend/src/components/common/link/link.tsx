import { NavLink as AppLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';

type Props = {
  to: AppRoute | string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const Link: React.FC<Props> = ({ children, to, className, onClick }) => (
  <AppLink to={to} className={className} onClick={onClick}>
    {children}
  </AppLink>
);

export default Link;
