import { useEffect, useState } from 'react';
import {
  addProduct,
  getCategories,
} from '../../../../../../Service/Product/Index';
import { toast } from 'react-toastify';
import {
  uploadFile,
  uploadMultipleFile,
} from '../../../../../../Service/Firebase/File';
import { handleConvertValue } from '../../../../../../Utils/ConvertValueFromOption';

export const UseAddNewProductHook = (
  setIsShowModalAddProduct,
  handleAddProduct,
) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState();
  const [category, setCategory] = useState([]);
  const [cost, setCost] = useState(0);
  const [imageURL, setImageURL] = useState('');
  const [author, setAuthor] = useState('');
  const [available, setAvailable] = useState(0);
  const [isSell, setIsSell] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState([]);

  const [listImageDependency, setListImageDependency] = useState([]);
  const [listImageDependencyLink, setListImageDependencyLink] = useState([]);
  const [listCategoryOption, setListCategoryOption] = useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    setListImageDependency(imageList);
  };

  const handleSelectCatogory = (option) => {
    setCategory(option);
  };

  useEffect(() => {
    getCategories().then((res) => {
      if (res.data.success) {
        const categoriesData = res.data?.data?.categories || [];
        const formattedCategories = categoriesData.map((category) => ({
          value: category.id,
          label: category.content,
        }));
        setListCategoryOption(formattedCategories);
        const matchingCategories = formattedCategories.filter((category) =>
          categoryId.includes(category.value),
        );
        setCategory(matchingCategories);
      }
    });
  }, []);

  // const handleUploadImage = async (event) => {
  //   event.preventDefault();
  //   if (event.target.files) {
  //     setImage(event.target.files[0]);
  //   }
  // };

  const handleUploadImage = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      const fileType = selectedImage.type;
      const validImageTypes = ['image/jpeg', 'image/png'];

      if (!validImageTypes.includes(fileType)) {
        toast.error('Only upload jpg or png files');
        setImage('');
        setImageURL('');
        return;
      }

      setImage(selectedImage);
      const imageUrl = URL.createObjectURL(selectedImage);
      setImageURL(imageUrl);
    }
  };
  useEffect(() => {
    const blob = new Blob([image], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    setImageURL(url);
  }, [image]);

  const handleAddNewProduct = async (book_imgs) => {
    uploadFile(image).then((res) => {
      addProduct({
        id,
        name,
        description,
        cost,
        isSell,
        price,
        available,
        author,
        url_img: res,
        // categories: category,
        categories: handleConvertValue(category),
        book_imgs,
      })
        .then((res) => {
          if (res.data.success) {
            handleAddProduct({
              id: res.data.data.book.id,
              name,
              description,
              cost,
              isSell,
              price,
              available,
              author,
              url_img: imageURL,
              sold: 0,
              // categories: category,
              categories: category,
              book_imgs,
            });
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error('add Product fail');
        })
        .finally(() => {
          setIsLoading(false);
          setIsShowModalAddProduct(false);
        });
    });
  };
  const isValidInput = (input) => {
    return typeof input === 'string'
      ? input.length >= 1
      : typeof input === 'number' && input >= 0;
  };
  const handleSaveProducts = async () => {
    if (!image) {
      setIsShowModalAddProduct(false);
      toast.error('Please upload an image for the Product.', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-error',
        bodyClassName: 'toast-body',
        hideProgressBar: true,
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      return;
    }
    setIsLoading(true);
    uploadMultipleFile(listImageDependency)
      .then((res) => {
        setListImageDependencyLink(res);
        handleAddNewProduct(res);
      })
      .catch((err) => {
        handleAddNewProduct([]);
        console.log(err);
        toast.error('failed to upload image');
      });
  };

  useEffect(() => {
    if (available !== null && available !== 0) {
      setIsSell(true);
    } else {
      setIsSell(false);
    }
  }, [available]);
  return {
    name,
    setName,
    isLoading,
    image,
    price,
    imageURL,
    isValidInput,
    description,
    author,
    setDescription,
    handleSelectCatogory,
    onChange,
    handleSaveProducts,
    listCategoryOption,
    category,
    listImageDependency,
    setAuthor,
    available,
    setAvailable,
    setIsSell,
    isSell,
    cost,
    setCost,
    handleUploadImage,
    setPrice,
  };
};
