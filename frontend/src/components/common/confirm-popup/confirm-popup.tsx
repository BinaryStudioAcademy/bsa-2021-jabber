import { Button, Modal } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  isShowModal: boolean;
  onCloseModal: () => void;
  onDelete: () => void;
};

const ConfirmPopup: React.FC<Props> = ({
  isShowModal = true,
  onCloseModal,
  onDelete,
}) => {
  return (
    <Modal isShowModal={isShowModal} onCloseModal={onCloseModal}>
      <div className={styles.popup}>
        <h2>Are you sure?</h2>
        <div className={styles.btnWrapper}>
          <Button onClick={onDelete} label="Delete"></Button>
          <Button onClick={onCloseModal} label="Cancel"></Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmPopup;
