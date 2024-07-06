import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../../http/userAPI";
import { setAuthAction } from "../../../store/userReducer";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import { HOME_ROUTE } from "../../../utils/paths";

import styles from "../auth.module.scss";

interface LoginProps {
    setIsLogin: (isLogin: boolean) => void;
}

interface inputError {
    input: "LOGIN" | "PASSWORD" | "ALL" | null;
    message: string;
}

const Login: FC<LoginProps> = ({ setIsLogin }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<inputError>({ input: null, message: "" });

    const checkInputValid = () => {
        setError({ input: null, message: "" });

        if (login.length <= 0) {
            setError({ input: "LOGIN", message: "Вкажіть логін" });
            return false;
        }
        if (password.length <= 0) {
            setError({ input: "PASSWORD", message: "Вкажіть пароль" });
            return false;
        }

        return true;
    }

    const completeLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const valid = checkInputValid();
        if (!valid) {
            return;
        }

        loginUser(login, password).then((data) => {
            if (data.error) {
                if (data.status === 401) {
                    setError({ input: "ALL", message: "Неправильний логін чи пароль" });
                } else {
                    setError({ input: null, message: "Сталася невідома помилка. Спробуйте пізніше" })
                }
            } else {
                navigate(HOME_ROUTE);
                dispatch(setAuthAction(true));
            }
        });
    }

    return (
        <form className={styles.auth} onSubmit={completeLogin}>
            <h2 className={styles.title}>Вхід</h2>
            <Input
                type="text"
                placeholder="Логін"
                value={login}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                inputError={error.input === "ALL" || error.input === "LOGIN"}
            />
            <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                autoComplete="on"
                inputType="PASSWORD"
                inputError={error.input === "ALL" || error.input === "PASSWORD"}
            />
            <span className={styles.errorMessage}>{error.message}</span>
            <Button
                type="submit"
            >
                Увійти
            </Button>
            <span className={styles.underTitle}>
                Не маєте аккаунту? <span className={styles.redirect} onClick={() => setIsLogin(false)}>Зареєструватись</span>
            </span>
        </form>
    );
}

export default Login;