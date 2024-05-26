import { IRoute } from "./types/routeTypes";
import { HOME_ROUTE, AUTH_ROUTE } from "./utils/paths";

import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";

export const router: IRoute[] = [
    { 
        path: HOME_ROUTE,
        Component: HomePage
    },    
    {
        path: AUTH_ROUTE,
        Component: AuthPage
    }, 
];