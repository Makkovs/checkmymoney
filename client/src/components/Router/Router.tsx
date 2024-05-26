import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom"

import { router } from "../../routes";
import { HOME_ROUTE } from "../../utils/paths";

const AppRouter: FC = () => {
    return (
        <Routes>
            {router.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path='*' element={<Navigate to={HOME_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;