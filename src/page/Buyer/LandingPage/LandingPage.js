import React from 'react';
import Header from '../../../common/Components/Default/Header/Header';
import Footer from '../../../common/Components/Default/Footer';
import '../../../assets/css/buyer.css';
import { Link } from 'react-router-dom';
import { Loading } from '../../../common/Components/Default/Loading';
import { ListProduct } from '../Component/ListProduct/ListProduct';
import { UseLandingPageHook } from './UseLandingPageHook';

const HomeBuyer = () => {
  const {
    isLoading,
    products,
    bestSellerProducts,
    banners,
    plusDivs,
    currentDiv,
  } = UseLandingPageHook();
  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="body-content">
          <div className="container">
            <div className="full-home-banners">
              <div className="full-home-banners-main-banner">
                {banners.map((banner) => (
                  <img
                    src={banner?.url}
                    alt=""
                    width={796}
                    height={235}
                    className="banner-img"
                  />
                ))}
                <div className="full-home-banners-main-banner-indicators">
                  <div
                    className="full-home-banners-main-banner-indicators-left"
                    onClick={() => plusDivs(-1)}
                  >
                    &#10094;
                  </div>
                  <div
                    className="full-home-banners-main-banner-indicators-right"
                    onClick={() => plusDivs(1)}
                  >
                    &#10095;
                  </div>
                  <div className="full-banner-img-badge">
                    {banners.map((banner) => (
                      <span
                        className="banner-img-badge"
                        onClick={() => currentDiv(banner.id)}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="full-home-banners-right-wrapper">
                <img src={banners[0]?.url} alt="" width={394} height={115} />
                <img src={banners[1]?.url} alt="" width={394} height={115} />
              </div>
            </div>

            <div className="product-list">
              <div className="product-list-title">
                <h5>BEST SELLER </h5>
              </div>
              <div className="row">
                <ListProduct listProduct={bestSellerProducts} />
              </div>
            </div>

            <div className="product-list">
              <div className="product-list-title">
                <h5>OUR BOOKS</h5>
              </div>
              <div className="row">
                <ListProduct listProduct={products} />
              </div>

              <Link to="/all" className="text-align-center">
                <div className="color-white font-size-20px see-more-btn">
                  Xem thêm
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default HomeBuyer;
