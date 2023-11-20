import React, { useState } from 'react';
import { StarRating } from '../StarRating/StarRating';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../../../../Store/cart';
import { addCart } from '../../../../Service/Cart/Index';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export const BookBriefing = ({ book }) => {
  const user = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let evaluate = '';
  let sold = '';
  let reduce = '';
  let [amount, setAmount] = useState(1);
  set_evaluate();
  set_sold();
  set_reduce();

  function set_evaluate() {
    if (book?.evaluate >= 1000) {
      evaluate =
        Math.round((book?.evaluate / 1000 + Number.EPSILON) * 10) / 10 + 'k';
    } else evaluate = '' + book?.evaluate;
  }

  function set_sold() {
    if (book?.sold >= 1000) {
      sold = Math.round((book?.sold / 1000 + Number.EPSILON) * 10) / 10 + 'k';
    } else sold = '' + book?.sold;
  }

  function set_reduce() {
    if (book?.cost > book?.price) {
      reduce =
        (((book?.cost - book?.price) * 100) / book?.cost).toFixed(0) + '%';
    }
  }

  function update_amount(event) {
    if (amount + event <= 0) setAmount(1);
    else if (amount + event > book?.available) setAmount(book?.available);
    else setAmount(amount + event);
  }
  function update_amount_input(event) {
    if (event <= 0) setAmount(1);
    else if (event > book?.available) setAmount(book?.available);
    else setAmount(event);
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (book?.available < 1) {
      toast.error('This item is currently out of stock.');
      return;
    }
    const cart = {
      book_id: book?.id,
      amount: amount,
      user_id: user.id,
      price: book.price,
      name: book.name,
      url_img: book.url_img,
      store_id: book.store_id
    };
    console.log(cart);
    if (!user.isLogin) {
      dispatch(addItemToCart({ cart }));
      return;
    }
    addCart(cart)
      .then((res) => {
        if (res.data.success) {
          let lastItem = res?.data?.data?.carts.length - 1;
          dispatch(addItemToCart({cart:res?.data?.data?.carts[lastItem]}));
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="show-info col-6">
      <h2>{book?.name}</h2>
      <ul>
        <li>
          <span>{book?.author}</span>
        </li>
        <li>
          {book?.isSell === 0 && <span>Book is not for sale</span>}
        </li>
        <li>
          <div className="product-briefing-right">
            <div className="product-briefing-full-rating">
              <div className="flex">
                <StarRating
                  rating={(book?.rating / (book?.evaluate ? book?.evaluate : 1 )).toFixed(1)}
                />
                <div>
                  <a href="" className="product-briefing-text-evaluate">
                    {evaluate}
                  </a>
                  <div>Ratings</div>
                </div>
                <div>
                  <div className="product-briefing-text-sold">{sold}</div>
                  <div>Sold</div>
                </div>
              </div>
            </div>
            <div className="product-briefing-full-price">
              <div className="flex items-center">
                <div className="product-briefing-cost">${book?.cost}</div>
                <div className="product-briefing-price">${book?.price}</div>
                <div className="product-briefing-reduce">{reduce} OFF</div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="flex items-center margin-top-10px">
            <div className="product-briefing-full-detail_nav">Quantity</div>
            <div className="flex flex-wrap items-center">
              <button
                className="product-briefing-full-detail-quantity-button-left"
                onClick={() => update_amount(-1)}
              >
                -
              </button>
              <input
                className="product-briefing-full-detail-quantity-input"
                type="text"
                role="spinbutton"
                value={amount}
                onChange={(event) =>
                  update_amount_input(parseInt(event.target.value))
                }
              ></input>
              <button
                className="product-briefing-full-detail-quantity-button-right"
                onClick={() => update_amount(1)}
              >
                +
              </button>
            </div>
            <div className="product-briefing-full-detail-quantity-text">
              {book?.available} pieces available
            </div>
          </div>
        </li>
        <li>
          <div className="buy and add margin-top-10px">
            <button
              className="btn btn-product-details"
              onClick={(e) => {
                handleAddToCart(e);
                navigate('/Cart');
              }}
              disabled={book?.available < 1 || book?.isSell === 0}
            >
              <i className="fa-solid fa-credit-card"></i>
              &nbsp; Buy{' '}
            </button>
            <button
              className="btn btn-product-details"
              onClick={handleAddToCart}
              disabled={book?.available < 1 || book?.isSell === 0}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              &nbsp; Add to cart
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};
