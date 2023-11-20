import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { loginDefault } from '../../../../../Service/Auth/Login';
import { createUser } from '../../../../../Store/user';
import { uploadCartWhenLogin } from '../../../../../Utils/UploadCartWhenLogin';
import { initCart } from '../../../../../Store/cart';
import { toast } from 'react-toastify';

export const UseLoginHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const carts = useSelector((state) => state.cartReducer.carts);
  const handleLogin = (res) => {
    setEmail('');
    if (res.data.success) {
      const currentUser = dispatch(createUser(res.data.data));
      if (carts.length > 0) {
        uploadCartWhenLogin(carts, currentUser.id).catch((err) => {
          console.error(err);
          dispatch(initCart([]));
        });
      }
      navigate('/');
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
    setIsLoading(false);
  };
  const login = () => {
    setIsLoading(true);
    loginDefault(email, password)
      .then((res) => {
        handleLogin(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error('failed to Login');
        setIsLoading(false);
      });
  };
  const validateLogin = (email, password) => {
    if (email != '' && password != '') {
      return true;
    }
    return false;
  };
  return {
    login,
    validateLogin,
    email,
    setEmail,
    password,
    setPassword,
    isShowPassword,
    setIsShowPassword,
    isLoading,
  };
};
