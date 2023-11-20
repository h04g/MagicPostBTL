import React from 'react';
import Header from '../../../common/Components/Default/Header/Header';
import Footer from '../../../common/Components/Default/Footer';
import { Paginate } from '../../../common/Components/Default/Paginate';
import { Loading } from '../../../common/Components/Default/Loading';
import { ListProduct } from '../Component/ListProduct/ListProduct';
import { UseCategoryHook } from './UseCategoryHook';
const Category = () => {
  const {
    listProduct,
    id,
    categories,
    isLoading,
    searchParam,
    handleChangePage,
    lastPage,
  } = UseCategoryHook();
  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="body-content">
          <div className="container">
            <div className="result">
              <h4>
                Category{' : '}
                <span className="strike-through-2 fs-3">
                  {categories[id - 1]?.content}
                </span>
              </h4>
              <p>{categories[id - 1]?.description}</p>
            </div>
            <ListProduct listProduct={listProduct} />
          </div>
          {
            listProduct.length != 0 ?
              (<Paginate
                handleChangePage={handleChangePage}
                pageCount={lastPage}
                currentPage={
                  parseInt(searchParam?.get('page') ? searchParam?.get('page') : 1) - 1
                }
              />
              ) : (<></>)
          }
        </div>
      )}
      <Footer />
    </>
  );
};

export default Category;
