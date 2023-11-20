import React from 'react';
import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {isTokenExpired} from "../../Utils/IsTokenExpried";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state?.userReducer?.token);
  if (isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }
    return children;
};
export default PrivateRoute;
