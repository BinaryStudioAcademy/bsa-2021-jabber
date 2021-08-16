import { AppRoute, ButtonColor, ButtonStyle, ButtonType } from 'common/enums/enums';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import { Link } from 'components/common/common';

type Props = {
  label: string;
  type?: ButtonType;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  buttonStyle?: ButtonStyle;
  buttonColor?: ButtonColor;
  className?: string;
  href?: AppRoute | string;
};

const Button: React.FC<Props> = ({
  type = ButtonType.BUTTON,
  buttonStyle = ButtonStyle.PRIMARY,
  buttonColor = ButtonColor.PINK,
  onClick,
  label,
  className,
  href,
}) => {

  const allowedClasses = getAllowedClasses(
    className,
    styles.button,
    styles[`style${buttonStyle}`],
    styles[`color${buttonColor}`],
  );

  const isLink = Boolean(href);

  return (
    <>
      {!isLink
        ? <button
          type={type}
          onClick={onClick}
          className={allowedClasses}
        >
          {label}
        </button>
        : <Link
          className={allowedClasses}
          to={href as string}
        >
          {label}
        </Link>}
    </>
  );
};

export default Button;
