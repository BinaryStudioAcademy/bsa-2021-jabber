import ReduxToastr, {
  positionType,
  transitionInType,
  transitionOutType,
} from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

type Props = {
  timeOut?: number;
  isNewestOnTop?: boolean;
  isDuplicatesPrevented?: boolean;
  hasProgressBar?: boolean;
  isClosingOnClick?: boolean;
  position?: positionType;
  transitionIn?: transitionInType;
  transitionOut?: transitionOutType;
  className?: string;
};

const Toaster: React.FC<Props> = ({
  timeOut = 4000,
  isNewestOnTop = true,
  isDuplicatesPrevented = true,
  hasProgressBar = true,
  isClosingOnClick = true,
  position = 'top-right',
  transitionIn = 'fadeIn',
  transitionOut = 'fadeOut',
  className,
}) => (
  <ReduxToastr
    timeOut={timeOut}
    newestOnTop={isNewestOnTop}
    preventDuplicates={isDuplicatesPrevented}
    progressBar={hasProgressBar}
    closeOnToastrClick={isClosingOnClick}
    position={position}
    transitionIn={transitionIn}
    transitionOut={transitionOut}
    className={className}
  />
);

export default Toaster;
