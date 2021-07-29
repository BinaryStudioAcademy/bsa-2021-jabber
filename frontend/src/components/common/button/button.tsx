import { ButtonColor, ButtonStyle, ButtonType } from 'common/enums/enums';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';

type Props = {
  label: string;
  type?: ButtonType;
  buttonStyle?: ButtonStyle;
  buttonColor?: ButtonColor;
  className?: string;
};

const Button: React.FC<Props> = ({
  type = ButtonType.BUTTON,
  buttonStyle = ButtonStyle.PRIMARY,
  buttonColor = ButtonColor.PINK,
  label,
  className,
}) => (
  <button
    type={type}
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
