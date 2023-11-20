import React from 'react';

const Header = ({ title }) => {
  return (
    <div className="login-header">
      <div className="navbar">
        <div className="align-items-center">
          <div className="login-text">{title}</div>
        </div>
        <div>Bạn cần giúp đỡ?</div>
      </div>
    </div>
  );
};

export default Header;
