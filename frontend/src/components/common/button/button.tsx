import { ButtonColors, ButtonStyle, ButtonType } from 'common/enums/enums';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';

type Props = {
  label: string;
  type?: ButtonType;
  buttonStyle?: ButtonStyle;
  buttonColor?: ButtonColors;
};

const Button: React.FC<Props> = ({
  type = ButtonType.BUTTON,
  label,
  buttonStyle = ButtonStyle.PRIMARY,
  buttonColor = ButtonColors.PINK }) => (
  <button
    type={type}
    className={getAllowedClasses(styles.button, styles[`style${buttonStyle}`], styles[`color${buttonColor}`])}
  >{label}</button>
);

export default Button;
