import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import HomePage from './page/HomePage/HomePage';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import TransactionPoint from './page/TransactionPoint/TransactionPoint';
import GatheringPoint from './page/GatheringPoint/GatheringPoint';
import Status from './page/Status/Status';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/trans',
    element: <TransactionPoint />,
  },
  {
    path: '/gather',
    element: <GatheringPoint />,
  },
  {
    path: '/status',
    element: <Status />,
  },
]);

const LoadingPage = () => {
  return <div>Loading</div>;
};
function App() {
  return (
    <>
      <Header />
      <div>
        <ToastContainer />
        <RouterProvider router={router} />
      </div>
      <Footer />
    </>
  );
}

export default App;
