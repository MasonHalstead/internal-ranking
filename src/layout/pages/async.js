import { lazy } from 'react';

export const SandboxPage = lazy(() => import('./sandbox/SandboxPage'));
export const RootPage = lazy(() => import('./root/RootPage'));
export const LoginPage = lazy(() => import('./login/LoginPage'));
export const RegisterPage = lazy(() => import('./register/RegisterPage'));
export const PasswordPage = lazy(() => import('./password/PasswordPage'));
export const EmailPage = lazy(() => import('./email/EmailPage'));
export const ErrorPage = lazy(() => import('./error/ErrorPage'));
