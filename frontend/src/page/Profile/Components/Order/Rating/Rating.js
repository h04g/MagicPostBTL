import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../../../../../assets/css/rating.css';
import {createBookRating} from "../../../../../Service/Product/Rating";
export const Rating = ({ setOrderDetailId, orderDetailId }) => {
  const [rating, setRating] = useState(0);
  const [commentError, setCommentError] = useState(false);
  const [comment, setComment] = useState('');


  const handleSendRating = (e) => {
    e.preventDefault();

    if (comment.length > 255) {
      setCommentError(true);
      return;
    } else {
      setCommentError(false);
    }

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
  function countCharacters(text) {
    return text.length;
  }

  function handleCommentChange(e) {
    const newText = e.target.value;
    if (newText.length <= 255) {
      setComment(newText);
      setCommentError(false);
    } else {
      setCommentError(true);
    }
  }

  return (
    <>
      <div
        className="modal fade"
        id="ratingModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Rating
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="star-rate">
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <i
                    key={starIndex}
                    className={`fa ${
                      starIndex <= rating ? 'fa-solid' : 'fa-regular'
                    } fa-star`}
                    onClick={() => setRating(starIndex)}
                  ></i>
                ))}
              </div>
              <div className="cmt-rate">
                <textarea
                  type="text"
                  placeholder="Add your comment..."
                  value={comment}
                  onChange={(e) => {
                    if (e.target.value.length <= 255) {
                      setComment(e.target.value);
                      setCommentError(false);
                    }
                  }}
                  className={commentError ? 'error' : ''}
                ></textarea>
                <p className={`char-count ${commentError ? 'error' : ''}`}>
                  {countCharacters(comment)}/255
                </p>
                {commentError && <p className="error-message">Comment must not exceed 255 characters</p>}
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
                data-bs-dismiss="modal"
                onClick={handleSendRating}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
