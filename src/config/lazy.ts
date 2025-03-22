import { lazy } from 'react';

const LazyLoginPage = lazy(() => import('@/pages/login'));
const LazyHomePage = lazy(() => import('@/pages/home'));

export { LazyHomePage, LazyLoginPage };
