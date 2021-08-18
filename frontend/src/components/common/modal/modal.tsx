import ReactModal from 'react-modal';
import styles from './styles.module.scss';

type Props = {
  isShowModal: boolean;
};

const Modal: React.FC<Props> = ({
  isShowModal = true,
  children,
}) => {

  return (
    <ReactModal
      isOpen={isShowModal}
      shouldCloseOnOverlayClick
      className={styles.modal}
      overlayClassName={styles.overlay}
      appElement={document.getElementById('root') as HTMLElement}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
