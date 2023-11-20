import { PaymentMethod } from '../../../../../../Utils/PaymentMethod';
import { orderStatus } from '../../../../../../Utils/OrderStatus';
import React from 'react';

export const OrderDetailTable = ({
  orderDetailData,
  handleShowOrderDetail,
}) => {
  return (
    <>
      <div className="table relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="table table-striped table table-striped table-bordered table-hover">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Cash Payment
              </th>
              <th scope="col" className="px-6 py-3">
                Buyer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Buyer Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3">
                Note
              </th>
              <th scope="col" className="status px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orderDetailData.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.address}</td>
                <td className="px-6 py-4">${item.cash_payment.toFixed(2)}</td>
                <td className="px-6 py-4">{item?.buyer_name}</td>
                <td className="px-6 py-4">{item?.phone_Number}</td>
                <td className="px-6 py-4">
                  {PaymentMethod(item?.payment_methods)}
                </td>
                <td className="px-6  py-4">{item.note}</td>
                <td className="px-6 py-4">{orderStatus(item?.status)}</td>
                <td className="order-actions px-6 py-4">
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalOrderDetail"
                    onClick={() => handleShowOrderDetail(item.id)}
                  >
                    {' '}
                    Detail{' '}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
