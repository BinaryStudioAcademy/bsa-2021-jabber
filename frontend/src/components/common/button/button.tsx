import { ButtonColor, ButtonStyle, ButtonType } from 'common/enums/enums';
import { Link } from 'components/common/common';
import ButtonElement from './button-element';

type Props = {
  label: string;
  type?: ButtonType;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  buttonStyle?: ButtonStyle;
  buttonColor?: ButtonColor;
  className?: string;
  href?: string;
};

const Button: React.FC<Props> = ({
  href,
  ...other
}) => {

  return (
    <>
      {href
        ? <Link to={href}>
          <ButtonElement {...other} />
        </Link>
        : <ButtonElement {...other} />
      }
    </>
  );
};

export default Button;
