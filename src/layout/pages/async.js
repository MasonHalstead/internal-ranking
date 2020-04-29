import { lazy } from 'react';

export const RootPage = lazy(() => import('./root/RootPage'));
export const ProfilePage = lazy(() => import('./profile/ProfilePage'));
export const OrganizationPage = lazy(() => import('./organization/OrganizationPage'));
export const ErrorPage = lazy(() => import('./error/ErrorPage'));
