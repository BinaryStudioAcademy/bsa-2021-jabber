import ReactModal from 'react-modal';
import styles from './styles.module.scss';

type Props = {
  isShowModal: boolean;
  onCloseModal: () => void;
};

const Modal: React.FC<Props> = ({
  isShowModal = true,
  onCloseModal,
  children,
}) => {

  return (
    <ReactModal
      isOpen={isShowModal}
      shouldCloseOnOverlayClick
      className={styles.modal}
      overlayClassName={styles.overlay}
      onRequestClose={onCloseModal}
      appElement={document.getElementById('root') as HTMLElement}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
