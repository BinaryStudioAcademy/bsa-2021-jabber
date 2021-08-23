import Popup from 'reactjs-popup';

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
    >
      {children}
    </Popup>
  );
};

export default PopUp;
