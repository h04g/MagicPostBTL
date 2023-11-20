import React, { useEffect, useState } from 'react';
import Header from '../../common/Components/Default/Header/Header';
import Footer from '../../common/Components/Default/Footer';
import { Link } from 'react-router-dom';

import { UseCartHook } from './UseCartHook';
//import { calculateTotalPrice } from '../../Utils/CaculateTotalPrice';
import '../../assets/css/cart.css'
const Cart = () => {
  const {
    carts,
    isLoading,
    handleDecrease,
    handleIncrease,
    handleRemoveProduct,
    handleSetCheckbox,
    currentUser,
    handlePayment
  } = UseCartHook();

  const cartsSortByStore = carts.sort((firstItem, secondItem) => firstItem.store_id - secondItem.store_id);
  const [checkPayment, setCheckPayment] = useState(true);

  let storeId = 0;


  function setStoreId(store_id) {
    if (storeId == store_id) return;
    storeId = store_id;
    return (
      <div className='flex store'>
        <div className='col-2-50 margin-top-5px'>
          <input className='' type="checkbox" hidden />
        </div>
        <div className='margin-top-5px'>
          <h5>Store Id : {storeId}</h5>
        </div>
      </div>
    )
  }

  const [calculateTotalPrice, setCalculateTotalPrice] = useState(0);

  function updateCalculateTotalPrice(book_id, checkbox) {
    handleSetCheckbox(book_id, checkbox);
    let total = 0;
    let store_id = 0;
    cartsSortByStore.map((cart) => {
      if ((cart.checkbox && cart.book_id != book_id) || (cart.book_id == book_id && checkbox == true)) {
        total += cart.amount * cart.price;
        if (store_id == 0) store_id = cart.store_id;
        else if (store_id != cart.store_id) store_id = -1;
      }
    });
    setCalculateTotalPrice(total);
    if (store_id < 0) setCheckPayment(false);
    else setCheckPayment(true);
  }

  const checkCartIsClick = () => {
    let check = false;
    cartsSortByStore.map((cart) => {
      if (cart.checkbox) check = true;
    })
    return check;
  }
  useEffect(() => {
    cartsSortByStore.map((cart) => {
      handleSetCheckbox(cart.book_id, false);
    });
  }, []);

  useEffect(() => {
    let total = 0;
    cartsSortByStore.map((cart) => {
      if (cart.checkbox) {
        total += cart.amount * cart.price;
      }
    });
    setCalculateTotalPrice(total);

  }, [carts]);


  return (
    <>
      <Header />
      <div className="body-content">
        <div className="container body-cart">
          <div className="cart-header">
            <h5>
              Cart ({carts?.length} item{carts?.length !== 1 && 's'})
            </h5>
          </div>

          {carts?.length === 0 ? (
            <div className="cart-empty-result-section">
              <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9bdd8040b334d31946f49e36beaf32db.png" className="cart-empty-result-section__icon" />
              <div className="cart-empty-result-section__title">
                Your shopping cart is empty
              </div>
              <Link to="/">
                <button className="btn btn-primary">Go shopping now</button>
              </Link>
            </div>
          ) : (
            <div className="col-12 flex">
              <div className="cart-item col-9">
                <div className='flex'>
                  <div className='col-2-50'>
                    <input className="" type="checkbox" hidden />
                  </div>
                  <div className='col-28-50'>Product Name</div>
                  <div className='col-10-50'>Quantity</div>
                  <div className='col-5-50'>Purchase</div>
                  <div className='col-5-50'>Action</div>
                </div>
                <div>
                  {cartsSortByStore.map((cart) => (
                    <>
                      {setStoreId(cart.store_id)}
                      <div key={cart.book_id} className='col-12 flex margin-top-10px line'>
                        <div className='col-2-50'>
                          {
                            cart.checkbox ? (
                              calculateTotalPrice != 0 ? (
                                <input type="checkbox" checked onClick={() => { updateCalculateTotalPrice(cart.book_id, false); }} />
                              ) : (
                                <input type="checkbox" onClick={() => { updateCalculateTotalPrice(cart.book_id, true); }} />
                              )
                            ) : (
                              <input type="checkbox" onClick={() => { updateCalculateTotalPrice(cart.book_id, true); }} />
                            )
                          }

                        </div>
                        <div className="col-28-50 flex justify-content-between">
                          <div className="cart-item-image col-2 flex justify-content-center">
                            <a href={`/product/${cart?.book_id}`}>
                              <img src={cart.url_img} alt={cart?.name} />
                            </a>
                          </div>
                          <div className="cart-item-info col-8">
                            <div className="cart-item-title">
                              <span>{cart?.name}</span>
                            </div>
                            <div className="cart-item-price-per">
                              <span>Price : {cart?.price}$</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-10-50">
                          <div className="flex flex-wrap items-center margin-top-30px">
                            <button
                              className="cart-quantity-button-left"
                              onClick={() =>
                                handleDecrease(cart?.book_id, cart?.id)
                              }
                              disabled={isLoading}
                            >
                              -
                            </button>
                            <input
                              aria-label="quantity"
                              id={`book-cart-amount${cart?.book_id}`}
                              className="cart-quantity-input"
                              max="1000"
                              min="1"
                              name=""
                              type="number"
                              value={cart?.amount}
                              onChange={(e) => {
                                const quantity =
                                  e.target.value === ''
                                    ? ''
                                    : parseInt(e.target.value);
                              }}
                            />
                            <button
                              className="cart-quantity-button-right"
                              onClick={() =>
                                handleIncrease(cart?.book_id, cart?.id)
                              }
                              disabled={isLoading}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="col-5-50 price-total">
                          <div className='margin-top-35px'>
                            <span >{cart?.price * cart?.amount}$</span>
                          </div>
                        </div>
                        <div className="col-5-50">
                          <button type="button" className="btn margin-top-30px" onClick={() => { handleRemoveProduct(cart?.book_id, cart?.id); updateCalculateTotalPrice(cart.book_id, false) }}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <div className="cart-payment col-3">
                {carts.length > 0 && (
                  <>
                    <div className="price">
                      <h6>Total :</h6>
                      <span>{calculateTotalPrice}$</span>
                    </div>
                    {currentUser.isLogin ? (
                      <div>
                        <Link className="payment-btn" >
                          <button className="btn btn-primary" onClick={handlePayment} disabled={!checkPayment || !checkCartIsClick.call()}>Payment</button>
                        </Link>

                        {!checkPayment && <span className="center-parent" >Book not in two store</span>}
                      </div>

                    ) : (
                      <div>
                        <span className="center-parent " >Please login for payment!</span>
                        <Link className="payment-btn margin-top-20px" to="/Login">
                          <button className="btn btn-primary">Login</button>
                        </Link>
                      </div>
                    )
                    }
                  </>
                )}
              </div>
            </div>
          )}

        </div>
      </div >
      <Footer />
    </>
  );
};

export default Cart;
