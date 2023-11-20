import React from 'react';
import Header from '../../../common/Components/Default/Header/Header';
import Footer from '../../../common/Components/Default/Footer';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { addressOption } from '../../../Utils/AddressOption';
import { ListOrder } from '../Components/ListOrder/ListOrder';
import '../../../assets/css/payment.css';
import { UsePaymentHook } from './UsePaymentHook';
import { ModalConfirmPayment } from './ModalConfirmPayment/ModalConfirmPayment';

const Payment = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    note,
    setNote,
    isAddNewAddress,
    calculateTotalPrice,
    setIsAddNewAddress,
    handleSaveOrder,
    carts,
    currentUser,
    handleAddNewAddress,
    handlePhoneNumberChange,
    phoneError,
    isConfirmButtonDisabled
  } = UsePaymentHook();
  return (
    <>
      <Header />
      <div className="container">
        <div className="address">
          <div className="address-title">
            <h4>Your Info</h4>
          </div>
          <div className="address-body">
            <div className="address-body-name col-12">
              <p className="address-body-name col-3">Your name:</p>
              <input
                type="text"
                placeholder="Enter your name"
                className="col-9"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="address-body-email col-12">
              <p className="address-body-email col-3">Your Email :</p>
              <input
                type="text"
                placeholder="Enter your email"
                className="col-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="address-body-phone col-12">
              <p className="address-body-phone col-3">Your PhoneNumber :</p>
              <div className="input-phone">
                <input
                    type="text"
                    placeholder="Enter your Phonenumber.."
                    className="col-9"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneNumberChange(e.target.value)}
                    pattern="^\d{10,11}$"
                    title="Phone number must be 10 or 11 digits"
                />
                {phoneError && <p className="error-text is-invalid">{phoneError}</p>}

              </div>

            </div>
            <div className="address-body-info col-12">
              <p className="address-body-info col-3">Your Address :</p>

              {!isAddNewAddress && (
                <div className="col-6 select-address">
                  <Select
                    options={addressOption(currentUser?.address)}
                    onChange={(e) => setAddress(e.value)}
                    defaultValue={addressOption(currentUser?.address)[0]}
                  />
                </div>
              )}
              {!isAddNewAddress && (
                <div className="new-address col-3 ">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsAddNewAddress(true);
                    }}
                  >
                    Or add new Address ?
                  </button>
                </div>
              )}
              {isAddNewAddress && (
                <input
                  type="text"
                  placeholder="Enter your Address..."
                  className="col-9"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  // onBlur={handleAddNewAddress}
                />
              )}
            </div>
            <div className="address-body-note col-12">
              <p className="address-body-note col-3">Note for Store :</p>
              <input
                type="text"
                placeholder="Enter your note for store..."
                className="col-9"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
        </div>
        <ListOrder listOrder={carts} />
        <div className="confirm">
          <div className="cofirm-price col-12">
            <p className="col-8">Total price:</p>
            <p className="col-4">{calculateTotalPrice()} $</p>
          </div>
          <div className="a"></div>
          <div className="confirm-payment col-12">
            <div className="back col-7">
              <button className="btn back-cart">
                <Link to="/cart" className="btn back-cart">
                  <i className="fa-solid fa-arrow-left"></i>
                  &nbsp; Back to Cart
                </Link>
              </button>
            </div>
            <div className="btn-confirm col-5">
              <button
                className="btn btn-primary btn-primary-confirm"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                disabled={isConfirmButtonDisabled}
              >
                Confirm
              </button>
              <ModalConfirmPayment
                address={address}
                name={name}
                phoneNumber={phoneNumber}
                note={note}
                carts={carts}
                calculateTotalPrice={calculateTotalPrice}
                handleSaveOrder={handleSaveOrder}
                email={email}
                handleAddNewAddress = {handleAddNewAddress}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Payment;
