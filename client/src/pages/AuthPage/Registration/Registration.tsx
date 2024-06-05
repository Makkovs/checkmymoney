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

const Registration: FC<RegistrationProps> = ({ setIsLogin }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const completeRegistration = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createUser(name, login, password).then(() => {
            navigate(HOME_ROUTE);
            dispatch(setAuthAction(true));
        });
    }

    return (
        <form className={styles.auth} onSubmit={completeRegistration}>
            <h2 className={styles.title}>Реєстрація</h2>
            <Input
                type="text"
                placeholder="Ім'я"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
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
                Зареєструватись
            </Button>
            <span className={styles.underTitle}>
                Вже маєте аккаунт? <span className={styles.redirect} onClick={() => setIsLogin(true)}>Увійти</span>
            </span>
        </form>
    );
}

export default Registration;