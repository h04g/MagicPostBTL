import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Banner1 from '../../../assets/image/jpg63b637735174b.jpg';
import Banner2 from '../../../assets/image/nhung-cuon-sach-van-hoc-hay.jpg';
import Banner3 from '../../../assets/image/olympic.jpg';
import Banner4 from '../../../assets/image/sach_nuoi_day_con.jpg';
import Banner5 from '../../../assets/image/sach-kinh-te.jpg';
import Banner6 from '../../../assets/image/sach-luyen-thi-2023.jpg';
import {
  getAllProducts,
  getBestSeller,
  getCategories,
} from '../../../Service/Product/Index';
import { initProducts } from '../../../Store/products';
import { setCategories } from '../../../Store/categories';

export const UseLandingPageHook = () => {
  const dispatch = useDispatch();
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const products = useSelector((state) => state.productReducer.products);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const [banners, setBanners] = useState([
    { id: 1, url: Banner1 },
    { id: 2, url: Banner2 },
    { id: 3, url: Banner3 },
    { id: 4, url: Banner4 },
    { id: 5, url: Banner5 },
    { id: 6, url: Banner6 },
  ]);

  const fetchProduct = () => {
    setIsLoading(true);
    getAllProducts(searchParam?.get('page'))
      .then((res) => {
        if (res.data.success) {
          dispatch(initProducts(res.data.data.data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const fetchCategory = () => {
    getCategories()
      .then((res) => {
        if (res.data.success) {
          dispatch(setCategories(res.data.data.categories));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const BestSeller = () => {
    getBestSeller()
      .then((res) => {
        if (res.data.success) {
          setBestSellerProducts(res.data.data.book);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    BestSeller();
  }, []);
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategory();
    }
    if (products.length === 0) {
      fetchProduct();
    }
  }, []);
  useEffect(() => {
    fetchProduct();
  }, [searchParam?.get('page')]);

  var slideIndex = 0;
  carousel();

  function plusDivs(n) {
    showDivs((slideIndex += n));
  }

  function currentDiv(n) {
    showDivs((slideIndex = n));
  }

  function showDivs(n) {
    var i;
    var x = document.getElementsByClassName('banner-img');
    var dots = document.getElementsByClassName('banner-img-badge');
    if (n > x.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
      x[i].classList.add('hidden');
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(
        ' banner-img-badge-active',
        '',
      );
    }
    if (x.length != 0) x[slideIndex - 1].classList.remove('hidden');
    if (dots.length != 0)
      dots[slideIndex - 1].className += ' banner-img-badge-active';
  }

  function carousel() {
    if (slideIndex == 0) {
      setTimeout(() => {
        plusDivs(1);
      }, 200);
    }
    plusDivs(1);
    setTimeout(carousel, 5000);
  }
  return {
    isLoading,
    products,
    bestSellerProducts,
    banners,
    plusDivs,
    currentDiv,
  };
};
