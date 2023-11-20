import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  getProductById,
  getProductByStoreId,
  searchProductInStore,
} from '../../../../Service/Product/Index';
import { toast } from 'react-toastify';

export const UseManageProductHook = () => {
  const [pageCount, setPageCount] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isClickClearSearch, setIsClickClearSearch] = useState(false);

  const [listProducts, setListProducts] = useState([]);
  const [isShowModalAddProduct, setIsShowModalAddProduct] = useState(false);
  const [isShowModalUpdateProduct, setIsShowModalUpdateProduct] =
    useState(false);
  const [dataProductEdit, setDataProductEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState([]);
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const [productRequest, setProductRequest] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const user = useSelector((state) => state.userReducer);

  const handleChangePage = (e) => {
    searchParam.set('page', e.selected + 1);
    setSearchParam(searchParam);
  };

  const fetchProduct = () => {
    setIsLoading(true);
    getProductByStoreId(user.id, searchParam?.get('page'))
      .then((res) => {
        if (res.data.success) {
          setProductRequest(res.data.data.data);
          setListProducts(res.data.data.data);
          setPageCount(res.data.data.last_page);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('get Product fail');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, [searchParam?.get('page'), isClickClearSearch]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleEditProductFromModal = (updatedProductData) => {
    try {
      setListProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.id === updatedProductData.book.id
            ? { ...updatedProductData, id: updatedProductData.book.id }
            : item,
        ),
      );
    } catch (error) {
      console.error('Error updating listProducts:', error);
    }
  };

  const handleEditProduct = (item) => {
    getProductById(item.id)
      .then((res) => {
        if (res.data.success) {
          const productData = res.data.data;
          setDataProductEdit(productData);

          if (Array.isArray(productData.bookCategory)) {
            const listProductId = productData.bookCategory.map(
              (item) => item.book_id,
            );

            setCategoryId(listProductId);
          }

          setIsShowModalUpdateProduct(true);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('get Product fail');
      });
  };

  const handleSearchProduct = () => {
    searchProductInStore(user.id, searchText).then((res) => {
      if (res.data.success) {
        setListProducts(res.data.data.data);
        setPageCount(res.data.data.last_page);
      }
    });
  };

  const handleAddProduct = (product) => {
    setListProducts([...listProducts, product]);
    setIsShowModalAddProduct(false);
  };

  const handleCickAddProduct = () => {
    setIsShowModalAddProduct(true);
  };
  return {
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
  };
};
