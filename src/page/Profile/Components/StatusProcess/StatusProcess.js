import React from 'react';
import { UseStatusProcessHook } from './UseStatusProcessHook';

export const StatusProcess = ({ statusNumber, orderId }) => {
  const { handleCancelOrder, handleDelivered, status } = UseStatusProcessHook(
    statusNumber,
    orderId,
  );
  return (
    <>
      <span>Status</span>
      {status < 5 && (
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            aria-label="Segment one"
            style={{ width: '20%' }}
            aria-valuenow="15"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            Wait
          </div>
          <div
            className={`progress-bar ${status >= 1 ? 'bg-success' : ''}`}
            role="progressbar"
            aria-label="Segment two"
            style={{ width: '20%' }}
            aria-valuenow="30"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            Store Accepted!
          </div>
          <div
            className={`progress-bar ${status >= 2 ? 'bg-success' : ''} `}
            role="progressbar"
            aria-label="Segment three"
            style={{ width: '20%' }}
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {' '}
            Preparing!
          </div>
          <div
            className={`progress-bar ${status >= 3 ? 'bg-success' : ''}`}
            role="progressbar"
            aria-label="Segment four"
            style={{ width: '20%' }}
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {' '}
            Delivering!
          </div>
          <div
            className={`progress-bar ${status >= 4 ? 'bg-success' : ''}`}
            role="progressbar"
            aria-label="Segment five"
            style={{ width: '20%' }}
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {' '}
            Delivered!
          </div>
        </div>
      )}
      {status === 5 && (
        <div className="progress">
          <div
            className="progress-bar bg-danger"
            role="progressbar"
            aria-label="Segment one"
            style={{ width: '100%' }}
            aria-valuenow="15"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            Cancel
          </div>
        </div>
      )}
      {status < 3 && (
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleCancelOrder}
        >
          Cancel
        </button>
      )}

      {status === 3 && (
        <button
          type="button"
          className="btn btn-success"
          onClick={handleDelivered}
        >
          Delivered
        </button>
      )}
    </>
  );
};
