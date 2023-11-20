export const calculateTotalPrice = (carts) => {
  return carts.reduce((total, cart) => total + cart.price * cart.amount, 0);
};
