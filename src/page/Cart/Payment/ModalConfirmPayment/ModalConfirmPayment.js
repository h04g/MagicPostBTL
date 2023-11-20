import React from 'react';

export const ModalConfirmPayment = ({
  name,
  email,
  phoneNumber,
  address,
  note,
  carts,
  calculateTotalPrice,
  handleSaveOrder,
                                      handleAddNewAddress,
}) => {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title payment-title" id="exampleModalLabel">
                Confirm Payment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="confirm-info">
                <div className="info-item">
                  <p className="col-3">Name:</p>
                  <span>{name}</span>
                </div>
                <div className="info-item">
                  <p className="col-3">Email:</p>
                  <span>{email}</span>
                </div>
                <div className="info-item">
                  <p className="col-3">Phone:</p>
                  <span>{phoneNumber}</span>
                </div>
                <div className="info-item">
                  <p className="col-3">Address:</p>
                  <span>{address}</span>
                </div>
                <div className="info-item">
                  <p className="col-3">Note:</p>
                  <span>{note}</span>
                </div>
              </div>
              <div className="confirm-order">
                <div className="confirm-oder-body">
                  <table className="table">
                    <tbody>
                      {carts.map((orderItem) => {
                        if(orderItem.checkbox)
                          return (
                            <tr key={orderItem.book_id} className="col-12">
                              <td className="col-4">{orderItem.name}</td>
                              <td className="col-1">{orderItem.amount}</td>
                              <td className="total-price col-2">
                                <span>{orderItem.amount * orderItem.price} $</span>
                              </td>
                            </tr>
                          )
                          return
                      })}
                    </tbody>
                  </table>
                  <div className="final-price">
                    <span className="total-title">Total Price: &nbsp;</span>{' '}
                    &nbsp;
                    <p>&nbsp; {calculateTotalPrice()}$</p>
                  </div>
                </div>
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
                type="button"
                className="btn btn-primary"
                onClick={handleSaveOrder}
                data-bs-dismiss="modal"
                onClickCapture={handleAddNewAddress}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
