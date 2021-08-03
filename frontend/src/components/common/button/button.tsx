import { ButtonColor, ButtonStyle, ButtonType } from 'common/enums/enums';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';

type Props = {
  label: string;
  type?: ButtonType;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  buttonStyle?: ButtonStyle;
  buttonColor?: ButtonColor;
  className?: string;
};

const Button: React.FC<Props> = ({
  type = ButtonType.BUTTON,
  buttonStyle = ButtonStyle.PRIMARY,
  buttonColor = ButtonColor.PINK,
  onClick,
  label,
  className,
}) => (
  <button
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
);

export default Button;
