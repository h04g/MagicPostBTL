import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import {
  BUYER_ROLE_NUMBER,
  SELLER_ROLE_NUMBER,
} from '../../../../../Utils/CheckingRole';
import { registerDefault } from '../../../../../Service/Auth/Register';
import { createUser } from '../../../../../Store/user';
import { toast } from 'react-toastify';
import {uploadCartWhenLogin} from "../../../../../Utils/UploadCartWhenLogin";
import {initCart} from "../../../../../Store/cart";

export const UseRegisterHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [canClickRegister, setCanClickRegister] = useState(false);
  const carts = useSelector((state) => state.cartReducer.carts);

  const register = () => {
    const role_id = isSeller ? SELLER_ROLE_NUMBER : BUYER_ROLE_NUMBER;
    setCanClickRegister(true);
    registerDefault(name, email, password, role_id)
      .then((res) => {
        if (res.data.success) {
        const currentUser =  dispatch(createUser(res.data.data));
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
        setCanClickRegister(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error('failed to Register');
        setCanClickRegister(false);
      });
  };
  const validateLogin = (email, password, name) => {
    if (email == '' && password == '' && name == '') return false;
    return true;
  };
  return {
    email,
    password,
    isShowPassword,
    name,
    isSeller,
    canClickRegister,
    setEmail,
    setPassword,
    setIsShowPassword,
    setName,
    setIsSeller,
    register,
    validateLogin,
  };
};
