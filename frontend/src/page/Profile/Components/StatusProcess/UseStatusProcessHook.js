import { useState } from 'react';
import { axiosClient } from '../../../../Service/Index';
import { toast } from 'react-toastify';
import {useDispatch} from "react-redux";

export const UseStatusProcessHook = (statusNumber, orderId) => {
  const [status, setStatus] = useState(statusNumber);
  const dispatch = useDispatch();

  const handleCancelOrder = () => {
    axiosClient()
      .put(`${process.env.API_URL}/order/cancel/${orderId}`)
      .then((res) => {
        if (res.data.success) {
          toast.success('Cancel Order successfully!');
          setStatus(5);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong!');
      });
  };

  const handleDelivered = () => {
    axiosClient()
      .put(`${process.env.API_URL}/order/status/${orderId}`)
      .then((res) => {
        if (res.data.success) {
          toast.success('Delivered successfully!');
            setStatus(4);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong!');
      }).finally(()=>{
      window.location.reload();
    });

  };
  return { handleCancelOrder, handleDelivered, status };
};
