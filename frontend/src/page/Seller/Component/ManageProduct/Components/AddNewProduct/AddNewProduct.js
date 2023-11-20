import React from 'react';
import Select from 'react-select';
import { Loading } from '../../../../../../common/Components/Default/Loading';
import { MultiImageUpload } from '../../../../../../common/Components/Default/MultiImageUpload';
import { UseAddNewProductHook } from './UseAddNewProductHook';

const AddNewProduct = ({ setIsShowModalAddProduct, handleAddProduct }) => {
  const {
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
  } = UseAddNewProductHook(setIsShowModalAddProduct, handleAddProduct);

  return (
    <>
      <div className="modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-1100 outline-none focus:outline-none">
        <div className="modal-dialog-centered relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          {isLoading ? (
            <Loading />
          ) : (
            <div className="modal-header  border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="modal-content  flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                {!image && (
                  <div className=" modal-title text-3xl font-semibold">
                    Add New Product
                  </div>
                )}
                {image && (
                  <img
                    src={imageURL}
                    className="rounded mx-auto d-block productImg"
                  />
                )}
                <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"></button>
              </div>
              {/*body*/}
              <div className=" modal-body relative p-6 flex-auto">
                <div className="dependencies-container">
                  <div className="text">Title*</div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        isValidInput(name) ? 'is-valid' : 'is-invalid'
                      }`}
                      placeholder="Enter product title ..."
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                    {isValidInput(name) ? (
                      <div className="valid-feedback">Looks good!</div>
                    ) : (
                      <div
                        id="validationServerUsernameFeedback"
                        className="invalid-feedback"
                      >
                        Please choose productname.
                      </div>
                    )}
                  </div>
                  <div className="text">Description*</div>
                  <div className="input-group mb-3">
                    <textarea
                      type="text"
                      className={`form-control ${
                        isValidInput(description) ? 'is-valid' : 'is-invalid'
                      }`}
                      placeholder="Enter product description ..."
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    ></textarea>
                    {isValidInput(description) ? (
                      <div className="valid-feedback">Looks good!</div>
                    ) : (
                      <div
                        id="validationServerDescriptionFeedback"
                        className="invalid-feedback"
                      >
                        Please enter a product description.
                      </div>
                    )}
                  </div>
                  <div className="text">Category*</div>
                  <div
                    className="input-group mb-3"
                    style={{ position: 'relative', zIndex: 1 }}
                  >
                    <Select
                      onChange={handleSelectCatogory}
                      className={`form-control`}
                      options={listCategoryOption}
                      isMulti
                      placeholder="Enter product Category..."
                      defaultValue={category}
                    />
                  </div>
                  <div className="text">Author*</div>
                  <div
                    className="input-group mb-3"
                    style={{ position: 'relative', zIndex: 0 }}
                  >
                    <input
                      style={{ position: 'relative' }}
                      type="text"
                      placeholder="Enter book author ..."
                      className={`form-control ${
                        isValidInput(author) ? 'is-valid' : 'is-invalid'
                      }`}
                      value={author}
                      onChange={(event) => setAuthor(event.target.value)}
                    />
                    {isValidInput(author) ? (
                      <div className="valid-feedback">Looks good!</div>
                    ) : (
                      <div
                        className="invalid-feedback"
                        style={{ position: 'relative' }}
                      >
                        Please add author.
                      </div>
                    )}
                  </div>
                  <div className="text">Avaliable*</div>
                  <div
                    className="input-group mb-3"
                    style={{ position: 'relative', zIndex: 0 }}
                  >
                    <input
                      type="number"
                      placeholder="Enter avaliable ..."
                      className={`form-control ${
                        isValidInput(available) ? 'is-valid' : 'is-invalid'
                      }`}
                      value={available}
                      onChange={(event) => {
                        const value = event.target.valueAsNumber;
                        setAvailable(value);
                        setIsSell(value !== null && value !== 0);
                      }}
                    />
                    {isValidInput(available) ? (
                      <div className="valid-feedback">Looks good!</div>
                    ) : (
                      <div className="invalid-feedback">
                        Please add available.
                      </div>
                    )}
                  </div>

                  <div className="text">is it sell ?*</div>
                  <div
                    className="input-group mb-3"
                    style={{ position: 'relative', zIndex: 0 }}
                  >
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

                  <div
                    className="input-group mb-3"
                    style={{ position: 'relative', zIndex: 0 }}
                  >
                    <div className="input-group-prepend">
                      <span className="input-group-text">Cost</span>
                    </div>
                    <input
                      type="number"
                      value={cost}
                      className={`form-control ${
                        isValidInput(cost) ? 'is-valid' : 'is-invalid'
                      }`}
                      onChange={(event) => setCost(event.target.valueAsNumber)}
                    />
                    {isValidInput(cost) ? (
                      <div className="valid-feedback">Looks good!</div>
                    ) : (
                      <div className="invalid-feedback">Please add cost.</div>
                    )}
                    <div className="input-group-append">
                      <span className="input-group-text">.00$</span>
                    </div>
                  </div>

                  <div
                    className="input-group mb-3"
                    style={{ position: 'relative', zIndex: 0 }}
                  >
                    <div className="input-group-prepend">
                      <span className="input-group-text">Price</span>
                    </div>
                    <input
                      type="number"
                      value={price}
                      className={`form-control`}
                      onChange={(event) => setPrice(event.target.valueAsNumber)}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">.00$</span>
                    </div>
                  </div>

                  <div className="text">Default Image*</div>
                  {/*<div className="input-group mb-3">*/}
                  {/*  <input*/}
                  {/*    type="file"*/}
                  {/*    className={image ? 'hidden' : 'form-control'}*/}
                  {/*    placeholder="Enter Product Image ..."*/}
                  {/*    onChange={handleUploadImage}*/}
                  {/*  />*/}

                  {/*</div>*/}
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className={image ? 'hidden' : 'form-control'}
                      placeholder="Enter product Image ..."
                      onChange={handleUploadImage}
                    />
                    {!image ? (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        Please upload an image for the product.
                      </div>
                    ) : (
                      <div
                        className="valid-feedback"
                        style={{ display: 'block' }}
                      >
                        Upload Success!
                      </div>
                    )}
                  </div>

                  <div className="text">Image dependency*</div>
                  <div className="input-group mb-3">
                    <MultiImageUpload
                      listImageDependency={listImageDependency}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="actions-btn justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => setIsShowModalAddProduct(false)}
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
          )}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddNewProduct;
