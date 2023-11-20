import React from 'react';
import {
  isSuccessDelivered,
  isSuccessDelivering,
  isSuccessPrepared,
  isSuccessStoreAccepted,
  ORDER_STATUS_MAPPING,
} from '../../../../../../Utils/OrderStatus';

import { UseOrderDetailHook } from './UseOrderDetailHook';
import { OrderDetailItem } from './Components/OrderDetailItem';
import { ProcessTaskBar } from './Components/ProcessTaskBar';
export const OrderDetail = ({ orderId, handleChangeStatus, listOrder }) => {
  const { order, oderDetail, handleUpdateStatus,handleCancelOrder } = UseOrderDetailHook(
    orderId,
    handleChangeStatus,
    listOrder,
  );
  return (
    <div
      className="modal fade order"
      id="modalOrderDetail"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Order Detail : <span>{orderId}</span>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <span>Status</span>
            <ProcessTaskBar order={order} />
            <table className="table table-striped table table-striped table-bordered table-hover">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <OrderDetailItem oderDetail={oderDetail} />
              </tbody>
            </table>
            <div className="final-price">
              <span>Total Price: {order?.cash_payment}$</span>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
                type = "button"
                className="btn btn-danger"
                onClick = {handleCancelOrder}
                disabled={
              order?.status >= ORDER_STATUS_MAPPING.STORE_ACCEPTED
                }
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdateStatus}
              disabled={
                isSuccessDelivered(order?.status) ||
                order?.status === ORDER_STATUS_MAPPING.DELIVERING
              }
            >
              Change to new Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
