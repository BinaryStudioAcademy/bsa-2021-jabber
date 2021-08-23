import Popup from 'reactjs-popup';
// import styles from './styles.module.scss';

type Props = {
  trigger: JSX.Element,
};

const PopUp: React.FC<Props> = ({
  trigger,
  children,
}) => {
  return (
    <Popup
      trigger={trigger}
      on="click"
      closeOnDocumentClick
      mouseLeaveDelay={300}
      mouseEnterDelay={0}
      arrow={false}
      // {...styles}
    >
      {children}
    </Popup>
  );
};

export default PopUp;
