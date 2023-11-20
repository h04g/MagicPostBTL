export const PaymentMethod = (methodId) => {
  switch (methodId) {
    case 0:
      return 'pay on receipt';
    case 1:
      return 'pay by card';
    default:
      return 'pay on receipt';
  }
};
