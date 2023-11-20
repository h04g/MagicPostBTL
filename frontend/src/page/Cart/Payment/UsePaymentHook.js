import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {createAddress, getAllAddressByUser} from '../../../Service/Address';
import {addNewAddress, initAddress} from '../../../Store/user';
import { deleteCart } from '../../../Service/Cart/Index';
import { orderCreate } from '../../../Service/Order/Index';
import { toast } from 'react-toastify';
import {deleteItemFromCart, initCart} from '../../../Store/cart';

export const UsePaymentHook = () => {
  const currentUser = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [name, setName] = useState(currentUser?.name);
  const [email, setEmail] = useState(currentUser?.email);
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone);
  const navigate = useNavigate();
  const [address, setAddress] = useState(
    currentUser?.address[0]?.address ?? '',
  );
  const [note, setNote] = useState('');
  const [isAddNewAddress, setIsAddNewAddress] = useState(false);
  const carts = useSelector((state) => state?.cartReducer?.carts);
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneNumberChange = (value) => {
    const sanitizedValue = value.replace(/\D/g, '');

    setPhoneNumber(sanitizedValue);

    if (sanitizedValue.length === 10 || sanitizedValue.length === 11) {
      setPhoneError('');
    } else {
      setPhoneError('Phone number must be 10 or 11 digits');
    }
  };
  useEffect(() => {
    getAllAddressByUser().then((res) => {
      dispatch(initAddress(res.data.data.addresses));
    });
  }, []);

  const calculateTotalPrice = () => {
    let total = 0;
    carts.map((cart)=>{
      if(cart.checkbox) {
        total += cart.amount * cart.price;
      }
    }); 
    return total;
  };

  const deleteCarts = async (bookIds) => {
    carts.map(async (cart) => {
      if(cart.checkbox)
      await deleteCart(cart.id);
    })
  };
  const isConfirmButtonDisabled = carts?.length < 1 || phoneError !== '' || (!phoneNumber || !phoneNumber.match(/^\d{10,11}$/))||address===''||name===''||email==='';
  const handleSaveOrder = (e) => {
    e.preventDefault();
    let order_details = [];
    carts.map((cart) => {
      if(cart.checkbox)
      order_details.push({
        'book_id': cart.book_id,
        'amount': cart.amount,
      });
    })
    orderCreate({
      buyer_name: name,
      email,
      phone_Number: phoneNumber,
      address,
      note,
      order_details,
      payment_method: 1,
    })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          toast.success(res.data.message);
          console.log(res.data.data.order_details);
          res.data.data.order_details.map((orderDetail) => {
            dispatch(deleteItemFromCart(orderDetail.book_id));
          });
          navigate('/');
          deleteCarts();
        } else {
          toast.error(res.data.error.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.error.message);
      });
  };

  const handleAddNewAddress = (e)=>{
    if (isAddNewAddress) {
    createAddress({address:address}).catch((err)=>{
      console.error(err);
    });
  }
  }

  return {
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
    setIsAddNewAddress,
    calculateTotalPrice,
    handleSaveOrder,
    carts,
    currentUser,

    handleAddNewAddress,

    handlePhoneNumberChange,
    phoneError,
    isConfirmButtonDisabled

  };
};
