import React from 'react';
import '../../../../assets/css/ordered.css';

export const ListOrder = ({ listOrder }) => {
  return (
    <>
      <div className="order">
        <div className="order-title">
          <h4>Your Order</h4>
        </div>
        <div className="oder-body">
          <table className="table">
            <tbody>
              {listOrder.map((orderItem) => {
                if (orderItem.checkbox)
                  return (
                    <tr className="col-12">
                      <td className="oder-img col-3">
                        <img src={orderItem.url_img} alt={orderItem.name} />
                      </td>
                      <td className="col-4">{orderItem.name}</td>
                      <td className="col-2 strike-through-2">
                        {orderItem.price} $
                      </td>
                      <td className="col-1">{orderItem.amount}</td>
                      <td className="total-price col-2">
                        <span>{orderItem.amount * orderItem.price} $</span>
                      </td>
                    </tr>
                  )
                return
              }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
