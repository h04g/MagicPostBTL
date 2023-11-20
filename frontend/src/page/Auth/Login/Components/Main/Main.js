import React from 'react';
import Form from '../Form/Form';
import WithFacebookAndGoogle from '../../../../../common/Components/Auth/WithFacebookAndGoogle';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="container-login">
      <div className="login">
        <div className="login-text-and-qr align-items-center">
          <div className="login-text">Đăng nhập</div>
        </div>
        <Form />
        <WithFacebookAndGoogle />
        <div className="justified-content-center">
          <a className="text-auth">Bạn mới biết đến ?</a>
          <a
            className="color-2e2ebe"
            onClick={() => {
              navigate('/Register');
            }}
          >
            Đăng ký
          </a>
        </div>
      </div>
    </div>
  );
};

export default Main;
