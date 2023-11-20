import { useState } from 'react';
import { createBookRating } from '../../../../../Service/Product/Rating';
import { toast } from 'react-toastify';

export const UseRatingHook = ({ orderDetailId, setOrderDetailId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const handleSendRating = (e) => {
    e.preventDefault();
    createBookRating({
      order_detail_id: orderDetailId,
      rating: rating,
      comment: comment,
    })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.error?.message);
      })
      .finally(() => {
        setRating(0);
        setComment('');
        setOrderDetailId(0);
      });
  };
  return { handleSendRating, rating, setRating, comment, setComment };
};
