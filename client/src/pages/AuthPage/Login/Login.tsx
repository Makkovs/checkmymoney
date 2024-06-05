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

const Login: FC<LoginProps> = ({ setIsLogin }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const completeLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        loginUser(login, password).then(() => {
            navigate(HOME_ROUTE);
            dispatch(setAuthAction(true));
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
            />
            <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                autoComplete="on"
                inputType="PASSWORD"
            />
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