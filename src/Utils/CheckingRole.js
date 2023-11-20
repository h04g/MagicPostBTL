export const BUYER_ROLE_NUMBER = 1;
export const SELLER_ROLE_NUMBER = 2;

export const checkingRole = (roleId) => {
  switch (roleId) {
    case BUYER_ROLE_NUMBER:
      return 'buyer';
    case SELLER_ROLE_NUMBER:
      return 'seller';
    default:
      return '/';
  }
};
