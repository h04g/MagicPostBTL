import { useEffect, useState } from 'react';
import {
  getAllOrder,
  getOrderByStatus,
  getOrderStore,
} from '../../../../Service/Order/Index';

export const UseOrderHook = () => {
  const [orderDetailData, setOrderDetailData] = useState([]);
  const [orderIdIsSelected, setOrderIdIsSelected] = useState(0);
  const [statusFilter, setStatusFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const handleChangePage = (e) => {
    setCurrentPage(e.selected);
    console.log(e.selected);
  };

  useEffect(() => {
    getOrderStore(currentPage + 1).then((res) => {
      if (res.data.success) {
        console.log(res);
        setOrderDetailData(res.data.data.data);
        setPageCount(res.data.data.last_page);
      }
    });
  }, []);

  useEffect(() => {
    if (statusFilter === 0) {
      getOrderStore(currentPage + 1).then((res) => {
        if (res.data.success) {
          setOrderDetailData(res.data.data.data);
          setPageCount(res.data.data.last_page);
        }
      });
    } else {
      getOrderByStatus(statusFilter - 1, currentPage + 1).then((res) => {
        if (res.data.success) {
          setOrderDetailData(res.data.data.data);
          setPageCount(res.data.data.last_page);
        }
      });
    }
  }, [statusFilter, currentPage]);

  const handleChangeStatus = (orderId, status) => {
    if (statusFilter === 0) {
      const orderStatusChange = orderDetailData.find(
        (order) => order.id === orderId,
      );
      if (orderStatusChange) {
        orderStatusChange.status = status;
        setOrderDetailData([...orderDetailData]);
      }
    } else {
      setOrderDetailData(
        orderDetailData.filter((order) => order.id !== orderId),
      );
    }
  };

  const handleShowOrderDetail = (orderId) => {
    setOrderIdIsSelected(orderId);
  };
  return {
    statusFilter,
    setStatusFilter,
    orderDetailData,
    handleShowOrderDetail,
    currentPage,
    handleChangePage,
    pageCount,
    orderIdIsSelected,
    handleChangeStatus,
  };
};
