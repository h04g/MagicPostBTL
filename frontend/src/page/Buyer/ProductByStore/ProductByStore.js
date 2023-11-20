import React from 'react';
import Header from '../../../common/Components/Default/Header/Header';
import Footer from '../../../common/Components/Default/Footer';
import { ListProduct } from '../Component/ListProduct/ListProduct';
import { Paginate } from '../../../common/Components/Default/Paginate';
import { Loading } from '../../../common/Components/Default/Loading';
import { UseProductByStoreHook } from "./UseProductByStoreHook";

const ProductByStore = () => {
    const {
        productSearchValue,
        isLoading,
        searchParam,
        handleChangePage,
        pageCount,
        storeId,
    } = UseProductByStoreHook();
    return (
        <>
            <Header />
            <div className="body-content">
                <div className="container">
                    <div className="result">
                        <h4>
                            Books Related To store{' '}
                        </h4>
                    </div>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <ListProduct listProduct={productSearchValue} />
                    )}
                </div>
                <Paginate
                    currentPage={
                        parseInt(searchParam?.get('page') ? searchParam?.get('page') : 1) - 1
                    }
                    pageCount={pageCount}
                    handleChangePage={handleChangePage}
                />
            </div>
            <Footer />
        </>
    );
};
export default ProductByStore;
