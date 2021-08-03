import { AppRoute, ButtonColor, ButtonStyle, ButtonType } from 'common/enums/enums';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';
import { Link } from '../common';

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

  return (
    <>
      {!href
        ? <button
          type={type}
          onClick={onClick}
          className={getAllowedClasses(
            className,
            styles.button,
            styles[`style${buttonStyle}`],
            styles[`color${buttonColor}`],
          )}
        >
          {label}
        </button>
        : <Link
          className={getAllowedClasses(
            className,
            styles.button,
            styles[`style${buttonStyle}`],
            styles[`color${buttonColor}`],
          )}
          to={href}
        >
          {label}
        </Link>}
    </>
  );
};

export default Button;
