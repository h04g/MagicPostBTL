import React, { useState } from 'react';
import Order from './Component/Order/Order';
import ManageProduct from './Component/ManageProduct/ManageProduct';
import Footer from '../../common/Components/Default/Footer';
import Header from '../../common/Components/Default/Header/Header';
import { useSelector } from 'react-redux';

const HomeSeller = () => {
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [showManageProduct, setShowManageProduct] = useState(true);
  const [buttonClicked, setButtonClicked] = useState('manage');
  const currentUser = useSelector((state) => state.userReducer);
  const handleOrderDetailClick = () => {
    setShowOrderDetail(true);
    setShowManageProduct(false);
    setButtonClicked('order');
  };
  const handleManageProductClick = () => {
    setShowOrderDetail(false);
    setShowManageProduct(true);
    setButtonClicked('manage');
  };
  return (
    <>
      <Header />
      <div className="body-content">
        <div className="admin-body">
          <div>
            {/* Buttons to toggle the table visibility */}
            <button
              className={buttonClicked === 'order' ? ' btn btn-info' : 'btn'}
              onClick={handleOrderDetailClick}
            >
              Order Detail
            </button>
            <button
              className={buttonClicked === 'manage' ? 'btn btn-info' : 'btn'}
              onClick={handleManageProductClick}
            >
              Manage Product
            </button>

            {/* Show the corresponding table based on the state */}
            {showOrderDetail && <Order />}
            {showManageProduct && <ManageProduct user={currentUser} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default HomeSeller;
