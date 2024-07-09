import { FC, PropsWithChildren } from "react";

import styles from "./button.module.scss";

interface ButtonProps extends PropsWithChildren {
    type?: "submit" | "reset" | "button";
    onClick?: (...args: any[]) => void;
    style?: React.CSSProperties;
}


const Button: FC<ButtonProps> = ({ type, onClick, style, children }) => {

    return (
        <button
            className={styles.button}
            type={type}
            onClick={onClick}
            style={style}
        >
            {children}
        </button>
    );
}
export default Button;