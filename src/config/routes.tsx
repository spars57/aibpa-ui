import { Route, Routes } from 'react-router';
import { LazyChatPage, LazyForgotPage, LazyHomePage, LazyLoginPage, LazyRegisterPage } from './lazy';

export enum ApplicationRoutesEnum {
    Home = '/',
    Login = '/login',
    Register = '/register',
    Forgot = '/forgot',
    ChatDetails = '/chat/:uuid',
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
            <Route path={ApplicationRoutesEnum.ChatDetails} element={<LazyChatPage />} />
        </Routes>
    );
};
