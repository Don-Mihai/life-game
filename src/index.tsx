import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

import { store } from './redux/store';
import { Provider } from 'react-redux';
import { LOCAL_STORAGE_KEY } from './redux/User/types';

import GameProfile from './pages/GameProfile';
import Characteristics from './pages/Characteristics';
import Auth from './pages/GameProfile/Auth';
import Profile from './pages/Profile';
import TreeSkill from './pages/TreeSkill';
import Test from './pages/Test';

// const LazyGameProfile = lazy(() => import('./pages/GameProfile'));
// const LazyCharacteristics = lazy(() => import('./pages/Characteristics'));
// const LazyTreeSkill = lazy(() => import('./pages/TreeSkill'));
// const LazyTest = lazy(() => import('./pages/Test'));
// const LazyProfile = lazy(() => import('./pages/Profile'));

const originalError = console.error;
console.error = (...args) => {
  // убираю ошибку из библиотеки drang-and-drop
  if (args[0].includes('defaultProps')) return;
  originalError.call(console, ...args);
};

const authLoader = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!token) {
    throw new Response('Unauthorized', { status: 401 });
  }
  return token;
};

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '/',
    loader: authLoader, // Проверка аутентификации
    element: <GameProfile />,
    errorElement: <Navigate to="/auth" replace /> // Перенаправление при ошибке
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/characteristics',
    element: <Characteristics />
  },
  {
    path: '/tree/:skillId',
    element: <TreeSkill />
  },
  {
    path: '/test',
    element: <Test />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ErrorBoundary>
);

// Регистрация Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      (registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      },
      (err) => {
        console.log('Service Worker registration failed:', err);
      }
    );
  });
}