import ReactModal from 'react-modal';
import styles from './styles.module.scss';

type Props = {
  showModal: boolean;
  shouldCloseOnOverlayClick?: boolean;
  children: React.ReactNode;
  handleCloseModal?: () => void;
};

const Modal: React.FC<Props> = ({
  showModal = true,
  // shouldCloseOnOverlayClick = true,
  handleCloseModal,
  children,
}) => {

  return (
    <ReactModal
      isOpen={showModal}
      // shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      // className={styles.modal}
      // overlayClassName={styles.overlay}
      appElement={document.getElementById('root') as HTMLElement}
    >
      {children}
      <button className={styles.closeBtn} onClick={handleCloseModal}> X </button>
    </ReactModal>
  );
};

export default Modal;
