import React from 'react';
import { OrderDetail } from './Components/OrderDetail/OrderDetail';
import { Paginate } from '../../../../common/Components/Default/Paginate';
import { UseOrderHook } from './UseOrderHook';
import { OrderDetailTable } from './Components/OrderDetailTable/OrderDetailTable';
import { NavSellerOrder } from './Components/NavSellerOrder/NavSellerOrder';
const Order = () => {
  const {
    statusFilter,
    setStatusFilter,
    orderDetailData,
    handleShowOrderDetail,
    currentPage,
    handleChangePage,
    pageCount,
    orderIdIsSelected,
    handleChangeStatus,
  } = UseOrderHook();

  return (
    <>
      <div className="admin-body">
        <div className="order">
          <NavSellerOrder
            setStatusFilter={setStatusFilter}
            statusFilter={statusFilter}
          />
          <OrderDetailTable
            handleShowOrderDetail={handleShowOrderDetail}
            orderDetailData={orderDetailData}
          />
        </div>
      </div>
      <Paginate
        currentPage={currentPage}
        handleChangePage={handleChangePage}
        pageCount={pageCount}
      />
      <OrderDetail
        orderId={orderIdIsSelected}
        handleChangeStatus={handleChangeStatus}
        listOrder={orderDetailData}
      />
    </>
  );
};

export default Order;
