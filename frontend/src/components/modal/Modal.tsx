import { ReactNode } from "react";
import styles from "./Modal.module.css";

interface IModalProps {
  children: ReactNode;
  showModal: boolean;
  setShowModal: (v: boolean) => void;
}

const Modal: React.FC<IModalProps> = ({
  children,
  showModal,
  setShowModal,
}) => {
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <dialog className={styles.container} open={showModal}>
        <span onClick={handleClose}>X</span>
        <div className={styles.wrapper}>{children}</div>
      </dialog>
      {showModal && <div onClick={handleClose} className={styles.overlay} />}
    </>
  );
};

export default Modal;
