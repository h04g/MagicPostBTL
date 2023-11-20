import React from 'react';
import Header from '../../../common/Components/Default/Header/Header';
import Footer from '../../../common/Components/Default/Footer';
import { ListProduct } from '../Component/ListProduct/ListProduct';
import { Paginate } from '../../../common/Components/Default/Paginate';
import { Loading } from '../../../common/Components/Default/Loading';
import { UseSearchHook } from './UseSearchHook';

const Search = () => {
  const {
    productSearchValue,
    isLoading,
    searchParam,
    handleChangePage,
    pageCount,
    search,
  } = UseSearchHook();
  return (
    <>
      <Header />
      <div className="body-content">
        <div className="container">
          <div className="result">
            <h4>
              Books Related To{' : '}
              <span className="strike-through-2 fs-3">{search.keyword}</span>
            </h4>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <ListProduct listProduct={productSearchValue} />
          )}
        </div>
        {
          productSearchValue.length != 0 ?
            (<Paginate
              currentPage={
                parseInt(searchParam?.get('page') ? searchParam?.get('page') : 1) - 1
              }
              pageCount={pageCount}
              handleChangePage={handleChangePage}
            />
            ) : (<></>)
        }
      </div>

      <Footer />
    </>
  );
};
export default Search;
