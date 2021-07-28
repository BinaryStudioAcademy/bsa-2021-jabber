import { ButtonType } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  label: string;
  type?: ButtonType;
  useStyle?: string;
};

const Button: React.FC<Props> = ({ type = ButtonType.BUTTON, label, useStyle = '' }) => (
  <button
    type={type}
    className={`${styles.button} ${useStyle ? styles[useStyle] : ''}`}
  >{label}</button>
);

export default Button;
