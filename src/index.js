import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GameProfile from './pages/GameProfile';
import Auth from './pages/GameProfile/Auth';
import { store } from './redux/store/store.ts';
import { Provider } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import { LOCAL_STORAGE_KEY } from './redux/User/types';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
  {
    path: '/game-profile',
    element: (
      <ProtectedRoute
        isAuthenticated={!!localStorage.getItem(LOCAL_STORAGE_KEY)} // Проверка авторизации
      >
        <GameProfile />
      </ProtectedRoute>
    ),
  },
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
