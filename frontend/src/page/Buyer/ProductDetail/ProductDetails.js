import React from 'react';
import Header from '../../../common/Components/Default/Header/Header';
import Footer from '../../../common/Components/Default/Footer';
import { BookBriefing } from '../Component/BookBriefing/BookBriefing';
import { UseProductDetailHook } from './UseProductDetailHook';
import {BookRating} from "../Component/BookRating/BookRating";

const ProductDetails = () => {
  const { bookImgs, img_big, product, category, render_img_small,store } =
    UseProductDetailHook();
  return (
    <>
      <Header />
      <div className="body-content">
        <div className="container product-details">
          <div className="book-info flex">
            <div className="book-image col-6">
              <div className="flex-column">
                <div className="product-briefing-img-big" id="img-big">
                  <img src={img_big} id="product-briefing-img-big" />
                </div>
                <div
                  className="product-briefing-img-list-small"
                  id="product-briefing-img-list-small"
                >
                  {bookImgs.map((img) => render_img_small(img))}
                </div>
              </div>
            </div>
            <BookBriefing book={product} />
          </div>
          <div className="info-details">
            <div className="info">
              <div className="info-title">
                <h2>Description</h2>
              </div>
              <ul>
                <li>
                  <span>Author :</span>
                  <span>{product?.author}</span>
                </li>
                <li>
                  <span>Store :</span>
                 <div>
                   <a href={`/store/${product?.store_id}`}>{store?.name}</a>
                 </div>
                </li>
                <li>
                  <span>Category :</span>
                  {category.map((item) => {
                    return (
                      <div className="mb-1 flex flex-wrap gap-1">
                        <a
                          className="cursor-pointer px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full text-gray-700 bg-gray-100 text-xs lg:text-sm font-bold hover:bg-white transition"
                          href={`/category/${item?.id}`}
                        >
                          {item.content}
                        </a>
                      </div>
                    );
                  })}
                </li>
              </ul>
            </div>
            <div className="description">
              <span>{product?.description}</span>
            </div>
          </div>
          <div className="rating comment">
            <BookRating bookId={product?.id} />
          </div>


          </div>
        </div>
      <Footer />
   
      </>

  );
};

export default ProductDetails;
