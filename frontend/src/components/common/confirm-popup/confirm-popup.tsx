import { Button, Modal } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmPopup: React.FC<Props> = ({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isShowModal={isOpen} onCloseModal={onClose}>
      <div className={styles.popup}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles.btnWrapper}>
          <Button onClick={onConfirm} label="Confirm" />
          <Button onClick={onClose} label="Cancel" />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmPopup;
