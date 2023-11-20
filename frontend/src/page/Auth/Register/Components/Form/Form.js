import React from 'react';
import hidePassword from '../../../../../assets/image/hidePassword.svg';
import showPassword from '../../../../../assets/image/showPassword.svg';
import { UseRegisterHook } from './UseRegisterHook';
const Form = () => {
  const {
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
  } = UseRegisterHook();
  return (
    <div>
      <div className="border-login-input align-items-center">
        <input
          className="login-input"
          type="text"
          placeholder="Email/Số điện thoại/Tên đăng nhập"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="border-login-input align-items-center">
        <input
          className="login-input"
          type="text"
          placeholder="Ten cua ban"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="border-login-input align-items-center">
        <input
          className="login-input"
          type={isShowPassword ? 'text' : 'password'}
          placeholder="Mật khẩu"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          className="button-show-password"
          onClick={() => setIsShowPassword(!isShowPassword)}
        >
          {isShowPassword ? (
            <img src={showPassword} className="show-password" />
          ) : (
            <img src={hidePassword} className="hide-password" />
          )}
        </button>
      </div>
      <div className="align-items-center margin-bottom-10px">
        <span>Bạn muốn bán hàng ?</span>
        <input
          className="is-seller"
          type="checkbox"
          value={isSeller}
          onChange={() => {
            setIsSeller(!isSeller);
          }}
        />
      </div>

      <div>
        {validateLogin(email, password, name) ? (
          <button
            className="button-login"
            onClick={register}
            disabled={canClickRegister}
          >
            ĐĂNG KÝ
          </button>
        ) : (
          <button className="button-login-no-click"> ĐĂNG KÝ </button>
        )}
      </div>
    </div>
  );
};

export default Form;
