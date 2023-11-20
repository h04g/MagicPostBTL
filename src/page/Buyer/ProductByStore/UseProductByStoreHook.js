import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {getProductByStoreId} from '../../../Service/Product/Index';
import {toast} from "react-toastify";

export const UseProductByStoreHook = () => {
    const store = useParams();
    const [productSearchValue, setProductSearchValue] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParam, setSearchParam] = useSearchParams();
    const [pageCount, setPageCount] = useState(1);
    const handleChangePage = (e) => {
        searchParam.set('page', e.selected + 1);
        setSearchParam(searchParam);
    };
    const fetchProductByResult = (storeId) => {
        setIsLoading(true);
       getProductByStoreId(storeId, searchParam?.get('page'))
            .then((res) => {
                if (res.data.success) {
                    console.log(res);
                    setProductSearchValue(res.data.data.data);
                    setPageCount(res.data.data.last_page);
                } else {
                    console.error('Failed to fetch products:', res.message);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('something went wrong');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    useEffect(() => {
        fetchProductByResult(store.id);
    }, [store, searchParam?.get('page')]);
    return {
        productSearchValue,
        isLoading,
        searchParam,
        setSearchParam,
        handleChangePage,
        pageCount,
        storeId: store,
    };
};
