import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { handleConvertValue } from '../../../../../../Utils/ConvertValueFromOption';

import { Loading } from '../../../../../../common/Components/Default/Loading';
import { toast } from 'react-toastify';
import { MultiImageUpload } from '../../../../../../common/Components/Default/MultiImageUpload';
import {
  uploadFile,
  uploadMultipleFile,
} from '../../../../../../Service/Firebase/File';
import { updateProductById } from '../../../../../../Service/Product/Index';
import _isEqual from 'lodash/isEqual';
import { getCategories } from '../../../../../../Service/Product/Index';
const UpdateProducts = ({
  setIsShowModalUpdateProduct,
  dataProductEdit,
  handleEditProductFromModal,
}) => {
  const [name, setName] = useState(dataProductEdit.book.name || '');
  const [description, setDescription] = useState(
    dataProductEdit.book.description || '',
  );
  const [price, setPrice] = useState(dataProductEdit.book.price || 0);
  const [image, setImage] = useState(dataProductEdit.book.image || '');

  const [categoryId, setCategoryId] = useState(
    dataProductEdit?.bookCategory?.map((book) => book.category_id) ?? [],
  );
  const [category, setCategory] = useState([]);
  const [cost, setCost] = useState(dataProductEdit.book.cost || 0);
  const [imageURL, setImageURL] = useState(dataProductEdit.book.url_img || '');
  const [author, setAuthor] = useState(dataProductEdit.book.author || '');
  const [available, setAvailable] = useState(
    dataProductEdit.book.available || 0,
  );
  const [book_imgs, setBook_imgs] = useState(
    dataProductEdit?.bookImgs?.map((book) => book.url_img) ?? [],
  );
  const [isSell, setIsSell] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [listCategoryOption, setListCategoryOption] = useState([]);
  const [listImageDependency, setListImageDependency] = useState(
    dataProductEdit?.bookImgs.map((imgUrl) => ({
      data_url: imgUrl.url_img,
    })) ?? [],
  );

  const onChange = (imageList, addUpdateIndex) => {
    setListImageDependency(imageList);
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

  const handleSelectCatogory = (option) => {
    setCategory(option);
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
      const imageUrl = URL.createObjectURL(selectedImage);
      setImageURL(imageUrl);
    }
  };

  const handleUpdateProduct = async (res) => {
    if (!dataProductEdit || !dataProductEdit.book || !dataProductEdit.book.id) {
      console.error('Invalid dataProductEdit object');
      return;
    }
    uploadFile(image).then(async (url_img) => {
      const updatedProductData = {
        name,
        description,
        price,
        cost,
        isSell,
        available,
        author,
        url_img: url_img !== '' ? url_img : imageURL,
        categories: handleConvertValue(category),
        book_imgs: res,
      };
      try {
        const response = await updateProductById(
          dataProductEdit.book.id,
          updatedProductData,
        );
        if (response.data.success) {
          toast.success(response.data.message);
          const updatedProduct = {
            ...dataProductEdit,
            name,
            description,
            price,
            cost,
            isSell,
            available,
            author,
            sold: dataProductEdit.book.sold,
            url_img: url_img !== '' ? url_img : imageURL,
            categories: category,
            book_imgs: res,
          };
          handleEditProductFromModal(updatedProduct);
          setIsShowModalUpdateProduct(false);
          setIsLoading(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        setIsShowModalUpdateProduct(false);
        toast.error('Failed to update Product');
        setIsLoading(false);
      }
    });
  };

  const handleSaveProducts = () => {
    setIsLoading(true);
    uploadMultipleFile(listImageDependency)
      .then((res) => {
        handleUpdateProduct(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to upload image');
        setIsShowModalUpdateProduct(false);
      });
  };
  const handleCheckboxChange = (event) => {
    setIsSell(event.target.checked);
  };

  useEffect(() => {
    if (available !== null && available !== 0) {
      setIsSell(true);
    } else {
      setIsSell(false);
    }
  }, [available]);

  useEffect(() => {
    if (!dataProductEdit || !dataProductEdit.book || !dataProductEdit.book.id) {
      console.error('Invalid dataProductEdit object');
      return;
    }
    setName(dataProductEdit.book.name);
    setDescription(dataProductEdit.book.description);
    setPrice(dataProductEdit.book.price);
    setImage(dataProductEdit.book.image);
    //setCategory(category.map((categoryID) => getContentByCategoryID(categoryID)) ?? []);
    // setCategoryId(dataProductEdit?.bookCategory?.map((book) => book.category_id )?? []);
    setCost(dataProductEdit.book.cost);
    setImageURL(dataProductEdit.book.url_img);
    setAuthor(dataProductEdit.book.author);
    setAvailable(dataProductEdit.book.available);
    setIsSell(dataProductEdit.book.isSell);
    setBook_imgs(listImageDependency);
  }, [_isEqual(dataProductEdit)]);
  return (
    <>
      <div className="modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="modal-dialog-centered relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          {isLoading ? (
            <Loading />
          ) : (
            <div className="modal-header  border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="modal-content  flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <img
                  src={imageURL}
                  className="rounded mx-auto d-block productImg"
                />
                <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"></button>
              </div>
              {/*body*/}
              <div className=" modal-body relative p-6 flex-auto">
                <div className="dependencies-container">
                  <div className="text">Title*</div>
                  <div className="input-group mb-3 ">
                    <input
                      type="text"
                      placeholder="Enter product title ..."
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div className="text">Description*</div>
                  <div className="input-group mb-3">
                    <textarea
                      type="text"
                      placeholder="Enter product description ..."
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    ></textarea>
                  </div>
                  <div className="text">Category*</div>
                  <div className="input-group mb-3">
                    <Select
                      value={category ?? []}
                      onChange={handleSelectCatogory}
                      options={listCategoryOption}
                      isMulti
                      placeholder="Enter product Category..."
                      // defaultValue={[{value: 1, label: 'Khoa học viễn tưởng'},{value: 2, label: 'Khoa  viễn tưởng'}] }
                      // value = {{value: 1, label: 'Chocolate'} }
                      // defaultValue={category}
                    />
                  </div>
                  <div className="text">Author*</div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      placeholder="Enter book author ..."
                      value={author}
                      onChange={(event) => setAuthor(event.target.value)}
                    />
                  </div>
                  <div className="text">Avaliable*</div>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      placeholder="Enter avaliable ..."
                      value={available}
                      onChange={(event) => {
                        const value = event.target.valueAsNumber;
                        setAvailable(value);
                        setIsSell(value !== null && value !== 0);
                      }}
                    />
                  </div>

                  <div className="text">is it sell ?*</div>
                  <div className="input-group mb-3">
                    <input
                      type="checkbox"
                      placeholder="Enter  ..."
                      value={isSell}
                      checked={isSell}
                      onChange={(event) => {
                        setIsSell(event.target.checked);
                      }}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Cost</span>
                    </div>
                    <input
                      type="number"
                      value={cost}
                      onChange={(event) => setCost(event.target.valueAsNumber)}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">.00$</span>
                    </div>
                  </div>

                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Price</span>
                    </div>
                    <input
                      type="number"
                      value={price}
                      onChange={(event) => setPrice(event.target.valueAsNumber)}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">.00$</span>
                    </div>
                  </div>

                  <div className="text">Default Image*</div>
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className={image ? 'hidden' : 'form-control'}
                      placeholder="Enter product Image ..."
                      onChange={handleUploadImage}
                    />
                  </div>

                  <div className="text">Image dependency*</div>
                  <div className="input-group mb-3">
                    <MultiImageUpload
                      listImageDependency={listImageDependency}
                      onChange={onChange}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="actions-btn justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => setIsShowModalUpdateProduct(false)}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={() => handleSaveProducts()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default UpdateProducts;
