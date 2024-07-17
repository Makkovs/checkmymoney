import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createUser } from "../../../http/userAPI";
import { setAuthAction } from "../../../store/userReducer";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import { HOME_ROUTE } from "../../../utils/paths";

import styles from "../auth.module.scss";

interface RegistrationProps {
    setIsLogin: (isLogin: boolean) => void;
}

interface inputError {
    input: "NAME" | "LOGIN" | "PASSWORD" | null;
    message: string;
}

const checkInputValid = (name: string, login: string, password: string, setError: (state: inputError) => void) => {
    setError({ input: null, message: "" });

    const nameLength = name.length < 3;
    const loginLength = login.length < 3;
    const passwordLength = password.length < 8;

    if (nameLength) {
        setError({ input: "NAME", message: "Ім'я має бути довшим за 3 символи" });
        return false;
    }
    if (loginLength) {
        setError({ input: "LOGIN", message: "Логін має бути довшим за 3 символи" });
        return false;
    }
    if (passwordLength) {
        setError({ input: "PASSWORD", message: "Пароль має бути довшим за 8 символи" });
        return false;
    }

    return true;
}

const Registration: FC<RegistrationProps> = ({ setIsLogin }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<inputError>({ input: null, message: "" });

    const completeRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const valid = checkInputValid(name, login, password, setError);

        if (!valid) {
            return;
        }

        const data = await createUser(name, login, password)
        if (data.error) {
            if (data.status === 409) {
                setError({ input: "LOGIN", message: "Такий логін вже існує" });
            } else {
                setError({ input: null, message: "Сталася невідома помилка. Спробуйте пізніше" });
            }
        } else {
            navigate(HOME_ROUTE);
            dispatch(setAuthAction(true));
        }
    }

    return (
        <form className={styles.auth} onSubmit={completeRegistration}>
            <h2 className={styles.title}>Реєстрація</h2>
            <Input
                type="text"
                placeholder="Ім'я"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                inputError={error.input === "NAME"}
            />
            <Input
                type="text"
                placeholder="Логін"
                value={login}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value.trim())}
                inputError={error.input === "LOGIN"}
            />
            <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value.trim())}
                autoComplete="on"
                inputType="PASSWORD"
                inputError={error.input === "PASSWORD"}
            />
            <span className={styles.errorMessage}>{error.message}</span>
            <Button
                type="submit"
            >
                Зареєструватись
            </Button>
            <span className={styles.underTitle}>
                Вже маєте аккаунт? <span className={styles.redirect} onClick={() => setIsLogin(true)}>Увійти</span>
            </span>
        </form>
    );
}

export default Registration;