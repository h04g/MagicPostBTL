import React, { useState } from 'react';

export const StarRating = ({ rating }) => {
  let starRating = ['0%', '0%', '0%', '0%', '0%'];

  set_rating();

  function set_rating() {
    let r = rating * 100;
    let vt = 0;
    while (r > 0) {
      if (r >= 100) starRating[vt] = 100 + '%';
      else starRating[vt] = r + '%';
      r = r - 100;
      vt++;
    }
  }

  return (
    <div>
      <a href="" className="product-briefing-text-rating">
        {rating}
      </a>
      <div className="product-briefing-stars-rating">
        {starRating.map((r) => (
          <div className="rating-stars__star-wrapper">
            <div className="rating-stars__lit" style={{ width: r }}>
              <svg
                enable-background="new 0 0 15 15"
                viewBox="0 0 15 15"
                x="0"
                y="0"
                className="svg-icon rating-stars__primary-star icon-rating-solid"
              >
                <polygon
                  points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                ></polygon>
              </svg>
            </div>
            <svg
              enable-background="new 0 0 15 15"
              viewBox="0 0 15 15"
              x="0"
              y="0"
              className="svg-icon rating-stars__hollow-star"
            >
              <polygon
                fill="none"
                points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
              ></polygon>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};
