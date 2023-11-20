import WithFacebookAndGoogle from '../../../../common/Components/Auth/WithFacebookAndGoogle';
import React from 'react';
import Form from './Form/Form';
import { useNavigate } from 'react-router-dom';
export const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="container-login">
      <div className="register">
        <div className="login-text-and-qr align-items-center">
          <div className="login-text">Đăng Ký</div>
        </div>
        <Form />
        <WithFacebookAndGoogle />
        <div className="justified-content-center">
          <a className="text-auth">Bạn đã có tài khoản?</a>
          <a
            className="color-2e2ebe"
            onClick={() => {
              navigate('/Login');
            }}
          >
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};
