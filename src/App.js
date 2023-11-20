import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './page/Auth/Login';
import './assets/css/auth.css';
import Register from './page/Auth/Register/Index';
import HomeBuyer from './page/Buyer/LandingPage/LandingPage';
import LoginWithSocial from './common/Components/Auth/LoginWithSocial';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './page/Auth/ForgotPassword/Index';
import HomeSeller from './page/Seller';
import { Provider } from 'react-redux';
import { persistor, store } from './Store';
import ProductDetails from './page/Buyer/ProductDetail/ProductDetails';
import { PersistGate } from 'redux-persist/integration/react';
import Cart from './page/Cart/Cart';
import Payment from './page/Cart/Payment/Payment';
import Profile from './page/Profile/Profile';
import Category from './page/Buyer/Category/Category';
import Search from './page/Buyer/Search/Search';
import AllProducts from './page/Buyer/AllProduct/AllProducts';
import PrivateRoute from "./common/CustomRouter/AuthRouter";
import ProductByStore from "./page/Buyer/ProductByStore/ProductByStore";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeBuyer />,
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

  {
    path: 'seller',
    element: <HomeSeller />,
  },
  {
    path: 'Product/:id',
    element: <ProductDetails />,
  },
  {
    path: 'cart',
    element: <Cart />,
  },
  {
    path: 'payment',
    element: <PrivateRoute><Payment /></PrivateRoute>,
  },
  {
    path: 'profile',
    element: <PrivateRoute><Profile /></PrivateRoute> ,
  },
  {
    path: 'category/:id',
    element: <Category />,
  },
  {
    path: 'search/:keyword',
    element: <Search />,
  },
  {
    path: 'all',
    element: <AllProducts />,
  },
  {
    path:'store/:id',
    element:<ProductByStore />
  }
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
