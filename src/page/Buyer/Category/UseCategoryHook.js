import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getCategoryById } from '../../../Service/Product/Index';
import { setCategories } from '../../../Store/categories';

export const UseCategoryHook = () => {
  const [listProduct, setListProduct] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [lastPage, setLastPage] = useState(1);
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    if (categories.length === 0) {
      setIsLoading(true);
      getCategories()
        .then((res) => {
          if (res.data.success) {
            dispatch(setCategories(res.data.data.categories));
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const handleChangePage = (e) => {
    searchParam.set('page', e.selected + 1);
    setSearchParam(searchParam);
  };
  const fetchProductByResult = () => {
    setIsLoading(true);
    getCategoryById(id, searchParam?.get('page'))
      .then((res) => {
        if (res.data.success) {
          setListProduct(res.data.data.data);
          setLastPage(res.data.data.last_page);
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
    fetchProductByResult();
  }, [id, searchParam?.get('page')]);
  return {
    listProduct,
    id,
    categories,
    isLoading,
    searchParam,
    setSearchParam,
    handleChangePage,
    lastPage,
  };
};
