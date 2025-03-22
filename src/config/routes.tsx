import { Route, Routes } from 'react-router';
import { LazyHomePage, LazyLoginPage } from './lazy';

export enum ApplicationRoutesEnum {
    Home = '/',
    Login = '/login',
    Register = '/register',
}

export const UnprotectedApplicationRoutes = () => {
    return (
        <Routes>
            <Route path={ApplicationRoutesEnum.Login} element={<LazyLoginPage />} />
        </Routes>
    );
};

export const ProtectedApplicationRoutes = () => {
    return (
        <Routes>
            <Route path={ApplicationRoutesEnum.Home} element={<LazyHomePage />} />
        </Routes>
    );
};
