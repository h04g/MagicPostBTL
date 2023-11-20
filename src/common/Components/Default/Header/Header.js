import React from 'react';
import { Link } from 'react-router-dom';

import '../../../../assets/css/header.css';

import Avatar from 'react-avatar';

import { UseHeaderHook } from './UseHeaderHook';
const Header = () => {
  const {
    currentUser,
    handleSearch,
    handleLogout,
    handleButtonClick,
    categories,
    cartSize,
  } = UseHeaderHook();
  return (
    <>
      <header
        className={`'bg-white py-4 shadow-md' : 'bg-none py-6'} header fixed w-full z-10 transition-all `}
      >
        <div className="container flex items-center justify-between h-full col-12">
          <Link className="col-1" to={'/'}>
            <div className="height-2rem">
              <i className=" fa-solid fa-house icon-min"></i>
            </div>
          </Link>
            <div className="col-8">
              <div className="searchbar">
                <div className="searchbar-form">
                  <input
                    type="text"
                    placeholder="Đăng ký và nhận voucher bạn mới đến 70k!"
                    className="searchbar-input"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch(e);
                      }
                    }}
                    id="search-input"
                  />
                </div>
                <button
                  className="btn-solid-primary"
                  onClick={handleSearch}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          <div className="flex justify-content-center categories dropdown col-1">
            <button
              className="choose-category"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={handleButtonClick}
            >
              <i className="fa-solid fa-bars icon-min"></i>
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
              style={{ maxHeight: '200px', overflowY: 'auto' }}
            >
              {categories.map((item, index) => (
                <li key={index}>
                  <a
                    className="dropdown-item btn"
                    href={`/category/${item?.id}`}
                  >
                    {item?.content}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {currentUser?.role_id === 2 && (
            <Link className="flex justify-content-end col-1" to={'/seller'}>
              <button className="btn btn-manage ">Manage</button>
            </Link>
          )}

          <Link
            className="flex justify-content-end cart-icon col-1"
            to={'/Cart'}
          >
            <i className="fa-solid fa-cart-shopping icon-min"></i>
            <span>{cartSize}</span>
          </Link>

          <div className="flex justify-content-end col-1">
            <div className="dropdown">
              <button
                className="btn btn-user btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {!currentUser.isLogin ? (
                  <i className="fa-solid fa-user icon-min"></i>
                ) : (
                  <Avatar
                    name={currentUser?.name}
                    src={currentUser?.avatar}
                    size="40"
                    round={true}
                    color="green"
                  />
                )}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  {!currentUser.isLogin && (
                    <Link className="dropdown-item" to={'/Login'}>
                      <button className="btn auth-btn">Log In</button>
                    </Link>
                  )}
                </li>
                <li>
                  {!currentUser.isLogin && (
                    <Link className="dropdown-item" to={'/Register'}>
                      <button className="btn auth-btn">Register</button>
                    </Link>
                  )}
                </li>
                <li>
                  {currentUser.isLogin && (
                    <button
                      className=" dropdown-item btn"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  )}
                </li>
                <li>
                  {currentUser.isLogin && (
                    <Link className="dropdown-item btn" to={'/profile'}>
                      Profile
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
