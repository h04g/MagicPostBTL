import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './page/Auth/Login';
import './assets/css/auth.css';
import Register from './page/Auth/Register/Index';
import LoginWithSocial from './common/Components/Auth/LoginWithSocial';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './page/Auth/ForgotPassword/Index';
import { Provider } from 'react-redux';
import { persistor, store } from './Store';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>lading</div>
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/o2auth',
    element: <LoginWithSocial />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'forgotPassword',
    element: <ForgotPassword />,
  },
]);


const LoadingPage = () => {
  return <div>Loading</div>;
};
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={LoadingPage} persistor={persistor}>
        <div>
          <ToastContainer />
          <RouterProvider router={router} />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
