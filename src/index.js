import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import GameProfile from './pages/GameProfile';
import Characteristics from './pages/Characteristics';
import Auth from './pages/GameProfile/Auth';
import { store } from './redux/store/store.ts';
import { Provider } from 'react-redux';
import { LOCAL_STORAGE_KEY } from './redux/User/types.ts';
import Profile from 'pages/Profile';
import TreeSkill from 'pages/TreeSkill';

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
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
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
