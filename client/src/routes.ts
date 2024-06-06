import { IRoute } from "./types/routeTypes";
import { HOME_ROUTE, AUTH_ROUTE, GROUP_ROUTE } from "./utils/paths";

import AuthPage from "./pages/AuthPage/AuthPage";
import GroupPage from "./pages/GroupPage/GroupPage";
import GroupsPage from "./pages/GroupsPage/GroupsPage";

export const router: IRoute[] = [
    {
        path: HOME_ROUTE,
        Component: GroupsPage
    },
    {
        path: AUTH_ROUTE,
        Component: AuthPage
    },
    {
        path: GROUP_ROUTE + "/:id",
        Component: GroupPage
    }
];