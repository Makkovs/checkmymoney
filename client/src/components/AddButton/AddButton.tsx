import { FC } from "react"

import styles from "./add-button.module.scss";

interface AddButtonProps {
    onClick?: (...args: any[]) => void;
    style?: React.CSSProperties;
}

const AddButton: FC<AddButtonProps> = ({onClick, style}) => {

    return (
        <div
            className={styles.add_button}
            onClick={onClick}
            style={style}
        >
            +
        </div>
    )
}

export default AddButton;