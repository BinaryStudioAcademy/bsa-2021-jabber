import { FC, ReactElement } from 'react';
import ReduxToastr, { ReduxToastrProps } from 'react-redux-toastr';
import { ToastPosition } from 'common/enums/enums';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './styles.module.scss';

const Notifications: FC = (): ReactElement<ReduxToastrProps> => (
  <ReduxToastr
    timeOut={4000}
    newestOnTop={false}
    preventDuplicates
    position={ToastPosition.TOP_RIGHT}
    transitionIn="fadeIn"
    transitionOut="fadeOut"
    closeOnToastrClick
  />
);

export default Notifications;
