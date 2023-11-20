import React from 'react';
import Header from '../../../common/Components/Default/Header/Header';
import Footer from '../../../common/Components/Default/Footer';
import '../../../assets/css/bestSeller.css';
import { Paginate } from '../../../common/Components/Default/Paginate';
import { ListProduct } from '../Component/ListProduct/ListProduct';
import { Loading } from '../../../common/Components/Default/Loading';
import { UseAllProductHook } from './UseAllProductHook';

const AllProducts = () => {
  const { isLoading, pageCount, products, searchParam, handleChangePage } =
    UseAllProductHook();
  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="all-title">
            <h4>All Books</h4>
          </div>
          <div className="row">
            <ListProduct listProduct={products} />
          </div>
          <Paginate
            pageCount={pageCount}
            handleChangePage={handleChangePage}
            currentPage={
              parseInt(
                searchParam?.get('page') ? searchParam?.get('page') : 1,
              ) - 1
            }
          />
        </div>
      )}
      <Footer />
    </>
  );
};

export default AllProducts;
