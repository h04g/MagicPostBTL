import React, { useEffect, useState } from 'react';
import Header from '../../common/Components/Default/Header/Header';
import Footer from '../../common/Components/Default/Footer';
import { UserInformation } from './Components/User/UserInfomation/UserInformation';
import { ListOrder } from './Components/Order/ListOrder/ListOrder';
const Profile = () => {
  const [viewMode, setViewMode] = useState('info');
  const [selectedOption, setSelectedOption] = useState('user');
  return (
    <>
      <Header />
      <div className="container">
        <div className="body-content">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${viewMode === 'info' ? 'active' : ''}`}
                onClick={() => setViewMode('info')}
              >
                Information
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${viewMode === 'orders' ? 'active' : ''}`}
                onClick={() => setViewMode('orders')}
              >
                Ordered
              </button>
            </li>
          </ul>
          {viewMode === 'info' && (
            <UserInformation
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
            />
          )}

          {viewMode === 'orders' && <ListOrder />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
