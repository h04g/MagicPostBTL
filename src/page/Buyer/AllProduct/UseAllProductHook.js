import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProducts } from '../../../Service/Product/Index';

export const UseAllProductHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [products, setProducts] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const handleChangePage = (e) => {
    searchParam.set('page', e.selected + 1);
    setSearchParam(searchParam);
  };
  const AllProducts = () => {
    setIsLoading(true);
    getAllProducts(searchParam?.get('page'))
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.data.data);
          setPageCount(res.data.data.last_page);
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
    AllProducts();
  }, [searchParam?.get('page')]);
  return {
    isLoading,
    pageCount,
    products,
    searchParam,
    setSearchParam,
    handleChangePage,
  };
};
