import { lazy } from 'react';

const LazyLoginPage = lazy(() => import('@/pages/auth/login'));
const LazyHomePage = lazy(() => import('@/pages/home'));
const LazyRegisterPage = lazy(() => import('@/pages/auth/register'));
const LazyForgotPage = lazy(() => import('@/pages/auth/forgot'))

export { LazyHomePage, LazyLoginPage, LazyRegisterPage, LazyForgotPage };
