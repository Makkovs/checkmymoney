import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setAuthAction, setUserAction } from "./store/userReducer";
import { useTypedSelector } from "./hooks/useTypedSelector";

import { check } from "./http/userAPI";
import { IUser } from "./types/userTypes";

import Header from "./components/Header/Header";
import AppRouter from "./components/Router/Router";

const App = () => {

    const dispatch = useDispatch();
    const newAUth: boolean = useTypedSelector(state => state.userReducer.isAuth)

    useEffect(() => {
        check().then((data: IUser) => {
            console.log("123")
            dispatch(setUserAction(data));
            dispatch(setAuthAction(true));
            console.log(`qwd: ${newAUth}`)
        });
    }, []);

    return (
        <BrowserRouter>
            <Header />
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
