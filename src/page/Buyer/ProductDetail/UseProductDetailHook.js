import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getCategories, getProductById } from '../../../Service/Product/Index';
import { toast } from 'react-toastify';
import { setCategories } from '../../../Store/categories';

export const UseProductDetailHook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesReducer);
  const [product, setProduct] = useState();
  const [bookImgs, setBookImgs] = useState([]);
  const [bookCategoryId, setBookCategoryId] = useState([]);
  const [category, setCategory] = useState([]);

  let [img_big, setImg_big] = useState();
  const [store,setStore] = useState();

  const fetchProduct = () => {
    getProductById(id)
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.data.book);
          setImg_big(res.data.data.book.url_img);
          setStore(res.data.data.store);
          let book_img = res.data.data.bookImgs;
          book_img.push({ url_img: res.data.data.book.url_img });
          setBookImgs(book_img.map((item) => item.url_img));
          setBookCategoryId(
            res.data.data.bookCategory.map((item) => item.category_id),
          );
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Can't get Product");
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
        console.log(err);
      });
  };
  useEffect(() => {
    fetchProduct();
    if (categories.length === 0) {
      fetchCategory();
    }
  }, []);
  useEffect(() => {
    setCategory(
      categories.categories.filter((item) => bookCategoryId.includes(item.id)),
    );
  }, [bookCategoryId]);
  function render_img_small(img) {
    if (img == img_big)
      return (
        <div className="product-briefing-img-small border_1px_ee4d2d">
          <img src={img} onMouseOver={() => setImg_big(img)} />
        </div>
      );
    else
      return (
        <div className="product-briefing-img-small">
          <img src={img} onMouseOver={() => setImg_big(img)} />
        </div>
      );
  }
  return { product, bookImgs, category, img_big, render_img_small ,store};
};
