import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteCart, getCarts, updateCart } from '../../Service/Cart/Index';
import { deleteItemFromCart, initCart, setAmount, setCheckbox } from '../../Store/cart';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";

export const UseCartHook = () => {
  const carts = [...useSelector((state) => state.cartReducer.carts)];
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const [total,setTotal] = useState(0);

  useEffect(() => {
    if (currentUser.isLogin) {
      getCarts().then((res) => {
        if (res.data.success) {
          let carts = res.data.data.carts
          carts.map((cart)=>{cart.checkbox = false;});
          dispatch(initCart(carts));
        }
      });
    }
  }, []);

  const handleSetAmount = (book_id, cardId, amount) => {
    setIsLoading(true);
    updateCart({ amount, book_id }, cardId)
      .then((res) => {
        if (res.data.success) {
          dispatch(setAmount({ book_id, amount }));
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDecrease = (book_id, cardId) => {
    // const amount = document.getElementById(`book-cart-amount${book_id}`).value;
    const amountInput = document.getElementById(`book-cart-amount${book_id}`);
    let amount = parseInt(amountInput.value);

    if (amount < 1) {
      return;
    }
    if (amount === 1) {
      toast.error("You cannot decrease the quantity below 1.");
      return;
    }

    if (!currentUser.isLogin) {
      dispatch(setAmount({ book_id, amount: parseInt(amount) - 1 }));
      return;
    }
    handleSetAmount(book_id, cardId, parseInt(amount) - 1);
  };

  const handleIncrease = (book_id, cardId) => {
    const amount = document.getElementById(`book-cart-amount${book_id}`).value;
    if (!currentUser.isLogin) {
      dispatch(setAmount({ book_id, amount: parseInt(amount) + 1 }));
      return;
    }
    handleSetAmount(book_id, cardId, parseInt(amount) + 1);
  };

  const handleDeleteCart = (cart_id, book_id) => {
    deleteCart(cart_id)
      .then((res) => {
        if (res.data.success) {
          dispatch(deleteItemFromCart(book_id));
        } else {
          toast.error(res.data.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSetCheckbox = (book_id, checkbox) => {
    dispatch(setCheckbox({ book_id, checkbox}));
  };

  const handleRemoveProduct = (book_id, cart_id) => {
    if (!currentUser.isLogin) {
      dispatch(deleteItemFromCart(book_id));
      return;
    }
    setIsLoading(true);
    handleDeleteCart(cart_id, book_id);
  };

  const handlePayment = () => {
    navigate('/payment');
  }

  return {
    carts,
    isLoading,
    handleDecrease,
    handleIncrease,
    handleRemoveProduct,
    handleSetCheckbox,
    currentUser,
    handlePayment,
  };
};
