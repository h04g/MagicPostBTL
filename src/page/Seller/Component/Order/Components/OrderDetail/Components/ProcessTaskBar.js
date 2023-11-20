import {
  isSuccessCanceled,
  isSuccessDelivered,
  isSuccessDelivering,
  isSuccessPrepared,
  isSuccessStoreAccepted,
} from '../../../../../../../Utils/OrderStatus';
import React from 'react';

export const ProcessTaskBar = ({ order }) => {
  return (
    <>
      {isSuccessCanceled(order?.status) ? (
        <div className="progress">
          <div
            className="progress-bar bg-danger"
            role="progressbar"
            aria-label="Segment two"
            style={{ width: '100%' }}
            aria-valuenow="30"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            Cancel
          </div>
        </div>
      ) : (
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
            className={`progress-bar ${
              isSuccessStoreAccepted(order?.status) ? 'bg-success' : ''
            }`}
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
            className={`progress-bar ${
              isSuccessPrepared(order?.status) ? 'bg-success' : ''
            } `}
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
            className={`progress-bar ${
              isSuccessDelivering(order?.status) ? 'bg-success' : ''
            }`}
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
            className={`progress-bar ${
              isSuccessDelivered(order?.status) ? 'bg-success' : ''
            }`}
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
    </>
  );
};
