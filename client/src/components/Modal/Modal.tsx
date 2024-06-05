import { FC, PropsWithChildren } from "react";

import styles from "./modal.module.scss";

interface ModalProps extends PropsWithChildren {
    visible: boolean;
    setVisible: (state: boolean) => void;
};

const Modal: FC<ModalProps> = ({ visible, setVisible, children }) => {
    const rootClasses = [styles.modal];

    if (visible) {
        rootClasses.push(styles.active);
    };

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;