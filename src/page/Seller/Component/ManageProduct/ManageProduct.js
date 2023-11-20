import React, { useCallback } from 'react';
import AddNewProduct from './Components/AddNewProduct/AddNewProduct';
import UpdateProducts from './Components/UpdateProduct/UpdateProducts';
import { Loading } from '../../../../common/Components/Default/Loading';
import { Link, useSearchParams } from 'react-router-dom';
import { Paginate } from '../../../../common/Components/Default/Paginate';
import { UseManageProductHook } from './UseManageProductHook';

const ManageProduct = () => {
  const {
    setSearchText,
    isLoading,
    handleEditProduct,
    handleAddProduct,
    category,
    handleEditProductFromModal,
    searchParam,
    searchText,
    dataProductEdit,
    pageCount,
    isShowModalAddProduct,
    setIsShowModalAddProduct,
    handleSearchProduct,
    setIsClickClearSearch,
    isClickClearSearch,
    handleCickAddProduct,
    listProducts,
    handleChangePage,
    setIsShowModalUpdateProduct,
    isShowModalUpdateProduct,
  } = UseManageProductHook();
  return (
    <>
      <div className="admin-body">
        <div className="action">
          <div className="find-item">
            <div className="form-control">
              <input
                className="form-control"
                // value={searchTerm}
                id="search-store"
                placeholder="Find Items by name or author"
                onChange={(event) => {
                  setSearchText(event.target.value);
                }}
                onKeyDown={(e)=>{if (e.key === 'Enter') {
                    handleSearchProduct();
                }}}
              />
              {searchText && (
                <i
                  className="fa-solid fa-x"
                  onClick={() => {
                    setSearchText('');
                    document.getElementById('search-store').value = '';
                    setIsClickClearSearch(!isClickClearSearch);
                  }}
                ></i>
              )}
            </div>
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={handleSearchProduct}
            >
              Search
            </button>
            {/*<img src = {window.URL.createObjectURL(productImage)} />*/}
          </div>
          {/*<img src={linkImage?linkImage:''} />*/}
          <button
            className="btn btn-success"
            // onClick={ setIsShowModalAddProduct(true)}
            onClick={handleCickAddProduct}
          >
            <i className="fa-solid fa-plus"></i>
            Add Product
          </button>
        </div>

        <div className="table relative overflow-x-auto shadow-md sm:rounded-lg">
          {isLoading ? (
            <Loading />
          ) : (
            <table className="table table-striped table-bordered table-hover">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price/Items
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quality
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sold
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {listProducts &&
                  listProducts.map((item, index) => {
                    return (
                      <tr
                        key={`products-${index}`}
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                      >
                        <td scope="row" className="px-6 py-4">
                          {item.id}
                        </td>
                        <td className="px-6 py-4">
                          <Link to={`/product/${item.id}`}>
                            <img
                              className="product-img"
                              src={item.url_img}
                              alt={`Image ${index}`}
                            />
                          </Link>
                        </td>
                        <td className="px-6 py-4">{item.name}</td>
                        <td className="px-6 py-4">{item.description}</td>
                        <td className="px-6 py-4">{item.author}</td>
                        <td className="px-6 py-4">{item.price}</td>
                        <td className="px-6 py-4">{item.available}</td>
                        <td className="px-6 py-4">{item.sold}</td>
                        <td className="px-6 py-4">
                          {' '}
                          {item.isSell ? 'Available' : 'Not Available'}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="btn btn-primary btn-actions"
                            onClick={() => handleEditProduct(item)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
        <Paginate
          handleChangePage={handleChangePage}
          pageCount={pageCount}
          currentPage={
            parseInt(searchParam?.get('page') ? searchParam?.get('page') : 1) -
            1
          }
        />
      </div>

      {isShowModalAddProduct && (
        <div className="overlay-container">
          <AddNewProduct
            setIsShowModalAddProduct={setIsShowModalAddProduct}
            handleAddProduct={handleAddProduct}
            category={category}
          />
        </div>
      )}

      {isShowModalUpdateProduct && (
        <div className="overlay-container">
          <UpdateProducts
            setIsShowModalUpdateProduct={setIsShowModalUpdateProduct}
            dataProductEdit={dataProductEdit}
            handleEditProductFromModal={handleEditProductFromModal}
            category={category}
          />
        </div>
      )}
      {isShowModalUpdateProduct && <div className="overlay" />}
    </>
  );
};

export default ManageProduct;
