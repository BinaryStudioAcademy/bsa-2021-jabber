import { ButtonType } from '../../../common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  label: string;
  className?: string;
  type?: ButtonType;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const MenuButton: React.FC<Props> = ({ type = ButtonType.BUTTON, label, onClick }) => (
  <button
    type={type}
    className={styles.filterButton}
    onClick={onClick}
  >
    {label}
  </button>
);

export default MenuButton;
