import React from 'react';
import hidePassword from '../../../../../assets/image/hidePassword.svg';
import showPassword from '../../../../../assets/image/showPassword.svg';
import { UseLoginHook } from './UseLoginHook';

function Form() {
  const {
    login,
    validateLogin,
    email,
    setEmail,
    password,
    setPassword,
    isShowPassword,
    setIsShowPassword,
    isLoading,
  } = UseLoginHook();
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

      <div>
        {validateLogin(email, password) ? (
          <button className="button-login" onClick={login} disabled={isLoading}>
            ĐĂNG NHẬP
          </button>
        ) : (
          <button className="button-login-no-click"> ĐĂNG NHẬP </button>
        )}
      </div>
      <div className="forgot-password justify-content-space-between">
        <a href="/forgotPassword">Quên mật khẩu</a>
        <a href="">Đăng nhập với SMS</a>
      </div>
    </div>
  );
}

export default Form;
