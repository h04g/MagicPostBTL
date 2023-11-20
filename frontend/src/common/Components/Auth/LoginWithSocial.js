import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginWithProvider } from '../../../Service/Auth/Login';
import { createUser } from '../../../Store/user';
import { uploadCartWhenLogin } from '../../../Utils/UploadCartWhenLogin';
import { initCart } from '../../../Store/cart';

const LoginWithSocial = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cartReducer.carts);
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const code = queryParameters.get('code');

    loginWithProvider(code, 'google')
      .then((res) => {
        if (res.data.success) {
          const currentUser = dispatch(createUser(res.data.data));
          if (carts.length > 0) {
            uploadCartWhenLogin(carts, currentUser?.id).catch((err) => {
              console.error(err);
              dispatch(initCart([]));
            });
          }
          navigate('/');
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('failed to Login');
      });
  }, []);
  return (
    <>
      <h1>Login with social</h1>
    </>
  );
};
export default LoginWithSocial;
