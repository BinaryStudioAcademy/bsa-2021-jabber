import { ButtonStyle, ButtonType } from 'common/enums/enums';
import { getAllowedClasses } from 'helpers/dom/dom';
import styles from './styles.module.scss';

type Props = {
  label: string;
  type?: ButtonType;
  useStyle?: ButtonStyle;
};

const Button: React.FC<Props> = ({ type = ButtonType.BUTTON, label, useStyle = ButtonStyle.PRIMARY }) => (
  <button
    type={type}
    className={getAllowedClasses(styles.button, styles[useStyle])}
  >{label}</button>
);

export default Button;
