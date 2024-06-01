import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setAuthAction, setUserAction } from "./store/userReducer";

import { check } from "./http/userAPI";
import { IUser } from "./types/userTypes";

import Header from "./components/Header/Header";
import AppRouter from "./components/Router/Router";

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        check().then((data: IUser) => {
            dispatch(setUserAction(data));
            dispatch(setAuthAction(true));
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
