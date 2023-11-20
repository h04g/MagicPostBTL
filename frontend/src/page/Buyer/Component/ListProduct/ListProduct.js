import React from 'react';
export const ListProduct = ({ listProduct }) => {
  return (
    <>
      {
        listProduct.length == 0 ?
          (
            <div className="search-empty-result-section">
              <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/a60759ad1dabe909c46a817ecbf71878.png" className="search-empty-result-section__icon" />
              <div className="search-empty-result-section__title">
                No results found
              </div>
              <div className="search-empty-result-section__hint">
                Try different or more general keywords
              </div>
            </div>
          ) : (<div className="list-products" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {listProduct.map((product) => {
              return (
                <a className="col-md-2-3 " href={`/product/${product.id}`}>
                  <div className="card">
                    <img src={product?.url_img} />
                    {product && product?.cost - product?.price > 0 && (
                      <div className="bg-discount">
                        <div className="discount">
                          <span>
                            {(
                              ((product?.cost - product?.price) / product?.cost) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                          <span>OFF</span>
                        </div>
                        <div className="flex">
                          <div className="triangle-topleft"></div>
                          <div className="triangle-topright"></div>
                        </div>
                      </div>
                    )}

                    <div className="card-body">
                      <p className="card-text book-name">{product?.name}</p>
                      <div className="margin-left-10 margin-right-10">
                        <div className="d-flex justify-content-between">
                          <p className="cost strike-through">{product?.cost}$ </p>
                          <span className="product-price">{product?.price}$</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>)
      }
    </>
  );
};
