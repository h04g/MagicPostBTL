import Header from '../../../common/Components/Auth/Header';
import React from 'react';
import { Main } from './Components/Main';
import './index.css';
import Footer from '../../../common/Components/Default/Footer';
const Register = () => {
  return (
    <>
      <div className="body-content-login flex flex-column">
        <Header title={'Đăng ký'} />
        <Main />
        <Footer />
      </div>
    </>
  );
};

export default Register;
