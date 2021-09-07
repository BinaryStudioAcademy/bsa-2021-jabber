import { NavLink as AppLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';

type Props = {
  to: AppRoute | string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  title?: string;
};

const Link: React.FC<Props> = ({ children, to, className, onClick, title }) => (
  <AppLink to={to} className={className} onClick={onClick} title={title}>
    {children}
  </AppLink>
);

export default Link;
