import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../../http/userAPI";
import { setAuthAction } from "../../../store/userReducer";

import { HOME_ROUTE } from "../../../utils/paths";

import styles from "../auth.module.scss";

interface LoginProps {
    setIsLogin: (isLogin: boolean) => void;
}

const Login: FC<LoginProps> = ({ setIsLogin }) => {

    const passwordHiddenUrl: string = "https://cdn-icons-png.flaticon.com/128/2767/2767146.png";
    const passwordNotHiddenUrl: string = "https://cdn-icons-png.flaticon.com/128/158/158746.png";

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
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
            <input
                className={styles.input}
                type="text"
                placeholder="Логін"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <div className={styles.input_password_wrapper}>
                <input
                    className={[styles.input, styles.input_password].join(" ")}
                    type={passwordHidden ? "password" : "text"}
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="on"
                />
                <button
                    className={styles.password_button}
                    type="button"
                    style={{ backgroundImage: `url(${passwordHidden ? passwordHiddenUrl : passwordNotHiddenUrl})` }}
                    onClick={() => setPasswordHidden(!passwordHidden)}
                ></button>
            </div>
            <button
                className={styles.button}
                type="submit"
            >
                Увійти
            </button>
            <span className={styles.underTitle}>
                Не маєте аккаунту? <span className={styles.redirect} onClick={() => setIsLogin(false)}>Зареєструватись</span>
            </span>
        </form>
    );
}

export default Login;