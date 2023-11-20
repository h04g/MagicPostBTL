import { useEffect, useState } from 'react';
import { axiosClient } from '../../../../../Service/Index';

export const UseListOrderHook = () => {
  const [listOrder, setListOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderDetailId, setOrderDetailId] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    axiosClient()
      .get(`${process.env.API_URL}/order?page=${currentPage}`)
      .then((res) => {
        if (res.data.success) {
          setListOrder(res.data.data.data);
          setLastPage(res.data.data.last_page);
        }
      });
  }, [currentPage]);

  const handleChangePage = (e) => {
    setCurrentPage(e.selected + 1);
  };
  return {
    handleChangePage,
    listOrder,
    orderDetailId,
    lastPage,
    currentPage,
    setOrderDetailId,
  };
};
