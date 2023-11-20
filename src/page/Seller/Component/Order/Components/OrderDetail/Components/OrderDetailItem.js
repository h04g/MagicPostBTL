import React from 'react';

export const OrderDetailItem = ({ oderDetail }) => {
  return (
    <>
      {oderDetail &&
        oderDetail.map((orderItem) => (
          <tr
            key={orderItem.id}
            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
          >
            <td className="px-6 py-4">{orderItem?.id}</td>
            <td className="px-6 py-4">{orderItem?.name}</td>
            <a href={`/product/${orderItem?.book_id}`}>
              <td className="px-6 py-4">
                <img className="product-img" src={orderItem?.url_img} />{' '}
              </td>
            </a>
            <td className="px-6 py-4"> {orderItem?.amount}</td>
            <td className="px-6 py-4"> {orderItem?.price}</td>
          </tr>
        ))}
    </>
  );
};
