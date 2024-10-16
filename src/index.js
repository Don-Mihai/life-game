import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GameProfile from './pages/GameProfile';
import Auth from './pages/GameProfile/Auth';
import { store } from './redux/store/store.ts';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
  {
    path: '/game-profile',
    element: <GameProfile />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
