import { ButtonType } from 'common/enums/enums';

type Props = {
  label: string;
  type?: ButtonType;
};

const Button: React.FC<Props> = ({ type = ButtonType.BUTTON, label }) => (
  <button type={type}>{label}</button>
);

export default Button;
