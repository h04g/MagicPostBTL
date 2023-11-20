export const orderStatus = (statusId) => {
  switch (statusId) {
    case 0:
      return 'Wait!';
    case 1:
      return 'Store Accepted!';
    case 2:
      return 'Preparing!';
    case 3:
      return 'Delivering!';
    case 4:
      return 'Delivered!';
    case 5:
      return 'Order Canceled!';
    default:
      return 'Wait!';
  }
};

export const ORDER_STATUS_MAPPING = {
  WAIT: 0,
  STORE_ACCEPTED: 1,
  PREPARING: 2,
  DELIVERING: 3,
  DELIVERED: 4,
  CANCELED: 5,
};

export const isSuccessPrepared = (status) => {
  return status >= 2;
};
export const isSuccessDelivering = (status) => {
  return status >= 3;
};
export const isSuccessDelivered = (status) => {
  return status >= 4;
};
export const isSuccessCanceled = (status) => {
  return status === 5;
};
export const isSuccessStoreAccepted = (status) => {
  return status >= 1;
};
