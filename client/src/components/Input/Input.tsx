import { FC, useEffect, useState } from "react";

import styles from "./input.module.scss";

enum InputTypes {
    STANDART = "STANDART",
    NUMBER = "NUMBER",
    PASSWORD = "PASSWORD",
    SOLID_BORDER = "SOLID_BORDER"
}

interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    autoComplete?: string;
    inputType?: string;
    style?: React.CSSProperties;
    inputError?: boolean
}

const Input: FC<InputProps> = ({
    type, placeholder, value, onChange, autoComplete,
    inputType = InputTypes.STANDART, style, inputError
}) => {

    const [classes, setClasses] = useState<string>("")

    const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
    const passwordHiddenUrl: string = "https://cdn-icons-png.flaticon.com/128/2767/2767146.png";
    const passwordNotHiddenUrl: string = "https://cdn-icons-png.flaticon.com/128/158/158746.png";

    useEffect(() => {
        switch (inputType) {
            case InputTypes.STANDART:
            case InputTypes.NUMBER:
                setClasses(styles.input);
                break;
            case InputTypes.PASSWORD:
                setClasses([styles.input, styles.input_password].join(" "));
                break;
            case InputTypes.SOLID_BORDER:
                setClasses([styles.input, styles.solid].join(" "));
                break;
            default:
                setClasses(styles.input);
                break;
        }

        if (inputError) {
            if (inputType !== InputTypes.PASSWORD) {
                setClasses(classes => classes + ` ${styles.input_error}`);
            }
        }
    });

    if (inputType === InputTypes.PASSWORD) {
        return (
            <div
                className={
                    inputError
                        ? [styles.input_password_wrapper, styles.input_error].join(" ")
                        : styles.input_password_wrapper
                }>
                <input
                    className={classes}
                    type={passwordHidden ? "password" : "text"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    style={style}
                />
                <button
                    className={styles.password_button}
                    type="button"
                    style={{ backgroundImage: `url(${passwordHidden ? passwordHiddenUrl : passwordNotHiddenUrl})` }}
                    onClick={() => setPasswordHidden(!passwordHidden)}
                ></button>
            </div>
        );
    } else {
        return (
            <input
                className={classes}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                style={style}
            />
        );
    }
};

export default Input;