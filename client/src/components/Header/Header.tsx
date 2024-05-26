import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setAuthAction } from "../../store/userReducer";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { AUTH_ROUTE, HOME_ROUTE } from "../../utils/paths";

import styles from "./header.module.scss";

const Header = () => {

    const isAuth: boolean = useTypedSelector(state => state.userReducer.isAuth);
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(setAuthAction(false));
        localStorage.setItem("token", "");
    }

    return (
        <header className={styles.header}>
            <NavLink
                className={styles.header__button}
                to={HOME_ROUTE}
            >
                <h1 className={styles.header__title}>CheckMyMoney</h1>
            </NavLink>
            <span className={styles.header__button}>Налаштування</span>
            {isAuth
                ?
                <NavLink
                    className={styles.header__button}
                    to={AUTH_ROUTE}
                    onClick={logOut}
                >
                    Вийти
                </NavLink>
                :
                <NavLink
                    className={styles.header__button}
                    to={AUTH_ROUTE}
                >
                    Увійти
                </NavLink>
            }
        </header>
    );
}

export default Header;