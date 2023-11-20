import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, getLengthCarts } from '../../../../Store/cart';
import { logoutUser } from '../../../../Store/user';
import { getCategories } from '../../../../Service/Product/Index';
import { setCategories } from '../../../../Store/categories';

export const UseHeaderHook = () => {
  const currentUser = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const cartSize = useSelector((state) => getLengthCarts(state));

  const handleSearch = (e) => {
    e.preventDefault();
    const search = document.getElementById('search-input').value;
    if (search === '') {
      navigate('/');
      return;
    }
    navigate(`/search/${search}`);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    dispatch(clearCart());
    navigate('/Login');
    window.localtion.reload();
  };

  const handleButtonClick = async () => {
    if (categories.length > 0) return;
    try {
      let res = await getCategories();
      dispatch(setCategories(res.data.data.categories));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  return {
    currentUser,
    handleSearch,
    handleLogout,
    handleButtonClick,
    categories,
    cartSize,
  };
};
