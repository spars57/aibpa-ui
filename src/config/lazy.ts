import { lazy } from 'react';

const LazyLoginPage = lazy(() => import('@/pages/authentication/login'));
const LazyHomePage = lazy(() => import('@/pages/home'));
const LazyRegisterPage = lazy(() => import('@/pages/authentication/register'));
const LazyForgotPage = lazy(() => import('@/pages/authentication/forgot'));

export { LazyForgotPage, LazyHomePage, LazyLoginPage, LazyRegisterPage };
