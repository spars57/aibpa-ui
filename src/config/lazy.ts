import { lazy } from 'react';

const LazyLoginPage = lazy(() => import('@/pages/auth/login'));
const LazyHomePage = lazy(() => import('@/pages/home'));
const LazyRegisterPage = lazy(() => import('@/pages/auth/register'));

export { LazyHomePage, LazyLoginPage, LazyRegisterPage };
