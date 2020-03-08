import { lazy } from 'react';

export const RootPage = lazy(() => import('./root/RootPage'));
export const ProfilePage = lazy(() => import('./profile/ProfilePage'));
export const ErrorPage = lazy(() => import('./error/ErrorPage'));
