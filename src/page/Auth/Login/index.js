import React from 'react';
import Main from './Components/Main/Main';
import Header from '../../../common/Components/Auth/Header';
import Footer from '../../../common/Components/Default/Footer';
const Login = () => {
  return (
    <div className="body-content-login flex flex-column">
      <Header title={'Đăng nhập'} />
      <Main />
      <Footer />
    </div>
  );
};

export default Login;
