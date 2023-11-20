import { addCart } from '../Service/Cart/Index';

export const uploadCartWhenLogin = async (carts, userId) => {
  for (let i = 0; i < carts.length; i++) {
    const cart = {
      book_id: carts[i].book_id,
      amount: carts[i].amount,
      user_id: userId,
    };
    await addCart(cart);
  }
};
