import { useEffect, useState } from 'react';
import {cancelOrder, updateStatus} from '../../../../../../Service/Order/Index';
import { toast } from 'react-toastify';

export const UseOrderDetailHook = (orderId, handleChangeStatus, listOrder) => {
  const [order, setOrder] = useState({});
  const [oderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    setOrder(listOrder.find((order) => order.id === orderId));
  }, [orderId]);
  useEffect(() => {
    setOrderDetail(order?.order_details);
  }, [order]);
  const handleUpdateStatus = () => {
    updateStatus(orderId)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setOrder({
            ...order,
            status: res.data.data.order.status,
          });
          handleChangeStatus(orderId, res.data.data.order.status);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong!');
      });
  };
  const handleCancelOrder = () => {
    cancelOrder(orderId).then((res)=>{
      if (res.data.success) {
        toast.success('cancel successfully!');
        setOrder({
          ...order,
          status: res.data.data.order.status,
        });
        handleChangeStatus(orderId, res.data.data.order.status);
      }
    }).catch((err)=>{
        console.error(err);
        toast.error('Something went wrong!');
    });
  }
  return { order, oderDetail, handleUpdateStatus ,handleCancelOrder};
};
