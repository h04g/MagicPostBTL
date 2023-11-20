import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { searchProduct } from '../../../Service/Product/Index';

export const UseSearchHook = () => {
  const search = useParams();
  const [productSearchValue, setProductSearchValue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const [pageCount, setPageCount] = useState(1);

  const handleChangePage = (e) => {
    searchParam.set('page', e.selected + 1);
    setSearchParam(searchParam);
  };
  const fetchProductByResult = (search) => {
    setIsLoading(true);
    searchProduct(search, searchParam?.get('page'))
      .then((res) => {
        if (res.data.success) {
          setProductSearchValue(res.data.data.data);
          setPageCount(res.data.data.last_page);
        } else {
          console.error('Failed to fetch products:', res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchProductByResult(search.keyword);
  }, [search.keyword, searchParam?.get('page')]);
  return {
    productSearchValue,
    isLoading,
    searchParam,
    setSearchParam,
    handleChangePage,
    pageCount,
    search,
  };
};
