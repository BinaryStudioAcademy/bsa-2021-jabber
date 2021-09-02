import Popup from 'reactjs-popup';

type Props = {
  trigger: JSX.Element,
  renderContent: (close: () => void) => JSX.Element,
};

const Popuper: React.FC<Props> = ({
  trigger,
  renderContent,
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
      {renderContent}
    </Popup>
  );
};

export default Popuper;
