import { FC, useEffect, useState } from "react";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";

import { HOME_ROUTE } from "../../utils/paths";

import Login from "./Login/Login";
import Registration from "./Registration/Registration";

const AuthPage: FC = () => {

    const navigate = useNavigate();

    const isAuth: boolean = useTypedSelector(state => state.userReducer.isAuth);

    const [isLogin, setIsLogin] = useState<boolean>(true);

    useEffect(() => {
        if (isAuth) {
            navigate(HOME_ROUTE);
        }
    }, [isAuth]);

    return (
        <>
            {isLogin
                ? <Login setIsLogin={setIsLogin} />
                : <Registration setIsLogin={setIsLogin} />
            }
        </>
    );
}

export default AuthPage;