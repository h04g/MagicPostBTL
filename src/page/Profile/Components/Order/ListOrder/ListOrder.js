import React from 'react';
import { Rating } from '../Rating/Rating';
import { StatusProcess } from '../../StatusProcess/StatusProcess';
import { Paginate } from '../../../../../common/Components/Default/Paginate';
import { UseListOrderHook } from './UseListOrderHook';

export const ListOrder = () => {
  const {
    handleChangePage,
    listOrder,
    orderDetailId,
    lastPage,
    currentPage,
    setOrderDetailId,
  } = UseListOrderHook();
  return (
    <>
      <div className="ordered">
        <div className="ordered-title">
          <h4>Your Orders</h4>
        </div>
        <div className="ordered-detail">
          {listOrder.map((order) => (
            <div className="ordered-first" key={order.id}>
              <p>Order {order.id}</p>
              <StatusProcess statusNumber={order?.status} orderId={order?.id} />
              <table>
                <thead>
                  <tr>
                    <th colspan="2">Product Info</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {order?.order_details?.map((product) => (
                  <tr className="col-12" key={product?.id}>
                    <td className="col-3">
                      <a href={`/product/${product?.book_id}`}>
                        <img
                          src={product?.url_img}
                          alt={`Product ${product.id}`}
                        />
                      </a>
                    </td>
                    <td className="col-4">{product?.name}</td>
                    <td className="col-2">{product?.amount}</td>
                    <td className="col-3">{product?.price}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#ratingModal"
                        onClick={() => {
                          setOrderDetailId(product?.id);
                        }}
                        disabled={order?.status !== 4}
                      >
                        Rating
                      </button>

                      <Rating
                        orderDetailId={orderDetailId}
                        setOrderDetailId={setOrderDetailId}
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          ))}
        </div>
      </div>
      <Paginate
        pageCount={lastPage}
        handleChangePage={handleChangePage}
        currentPage={currentPage - 1}
      />
    </>
  );
};
