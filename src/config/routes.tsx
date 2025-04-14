import { Route, Routes } from 'react-router';
import { LazyHomePage, LazyLoginPage, LazyRegisterPage, LazyForgotPage} from './lazy';

export enum ApplicationRoutesEnum {
    Home = '/',
    Login = '/login',
    Register = '/register',
    Forgot = '/forgot',
}

export const UnprotectedApplicationRoutes = () => {
    return (
        <Routes>
            <Route path={ApplicationRoutesEnum.Login} element={<LazyLoginPage />} />
            <Route path={ApplicationRoutesEnum.Register} element={<LazyRegisterPage />} />
            <Route path={ApplicationRoutesEnum.Forgot} element={<LazyForgotPage />} />
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
