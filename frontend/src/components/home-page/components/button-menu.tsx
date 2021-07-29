import { ButtonType } from '../../../common/enums/enums';

type Props = {
  label: string;
  className?: string;
  type?: ButtonType;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const MenuButton: React.FC<Props> = ({ type = ButtonType.BUTTON, label, className, onClick }) => (
  <button type={type} className={className} onClick={onClick}>{label}</button>
);

export default MenuButton;
