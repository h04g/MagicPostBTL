import React from 'react';
import Avatar from "react-avatar";
import {Paginate} from "../../../../common/Components/Default/Paginate";
import {UseBookRatingHook} from "./UseBookRatingHook";

export const BookRating = ({ bookId }) => {
const {ratings,currentPage,averageRating,pageCount,handleChangePage,formatDate} = UseBookRatingHook(bookId);

    const renderRatings = ratings.map((rating) => (
            <div className=" col-12 each-cmt" key={rating.id}>
                <div className="avatar-cmt col-3">
                    <Avatar
                        name={rating?.user_name}
                        src={rating?.user_avatar}
                        size="60"
                        round={true}
                        color="green"
                    />
                </div>

                <div className="user-info col-9">
                    <span className="user-name">{rating.user_name}</span>
                    <div className="user-rating">
                        {Array.from({ length: rating.rating }).map((_, index) => (
                            <i key={index} className="fa-solid fa-star"></i>
                        ))}
                    </div>
                    <span className="strike-through-2">{formatDate(rating.created_at)}</span>
                    <span>{rating.comment}</span>
                </div>
            </div>
        ));


    return (
        <>
            <div className="rating comment">
                <div className="info-title">
                    <h2>Rating</h2>
                </div>
                <div className="comment-rating">
                    <div className="show-cmt-rating">
                        {renderRatings}
                    </div>
                    {ratings.length > 0 && <Paginate
                        pageCount={pageCount}
                        currentPage={currentPage}
                        handleChangePage={handleChangePage}
                    />}

                </div>
            </div>
        </>
    );
};
