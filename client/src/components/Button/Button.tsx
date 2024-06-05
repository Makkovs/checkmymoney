import { FC, PropsWithChildren } from "react";

import styles from "./button.module.scss";

interface ButtonProps extends PropsWithChildren {
    type?: "submit" | "reset" | "button";
    onClick?: (...args: any[]) => void;
}


const Button: FC<ButtonProps> = ({ type, onClick, children }) => {

    return (
        <button
            className={styles.button}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
export default Button;