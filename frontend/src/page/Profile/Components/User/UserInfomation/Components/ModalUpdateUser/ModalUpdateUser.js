import React from 'react';
import { UseModalUpdateUserHook } from './UseModalUpdateUserHook';

export const ModalUpdateUser = ({ isLoading, setIsloading }) => {
  const {
    name,
    setPhone,
    setName,
    phone,
    role_id,
    currentUser,
    setAvatar,
    avatar,
    handleSellCheckboxChange,
    handleSubmit,
    handlePhoneNumberChange,
    isConfirmButtonDisabled,
    phoneError
  } = UseModalUpdateUserHook(isLoading, setIsloading);

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="avatar" className="col-form-label">
                    Avatar:
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    name="phone"
                    value={phone}
                    onChange={(e) => handlePhoneNumberChange(e.target.value)}
                    pattern="^\d{10,11}$"
                    title="Phone number must be 10 or 11 digits"
                  />
                  {phoneError && <p className="error-text is-invalid">{phoneError}</p>}
                </div>
                {currentUser?.role_id !== 2 && (
                  <div className="want-to-be-seller">
                    <input
                      type="checkbox"
                      id="sell"
                      name="sell"
                      checked={role_id === 2}
                      onChange={handleSellCheckboxChange}
                    />
                    <label htmlFor="sell">&nbsp; Do you want to sell ?</label>
                  </div>
                )}
              </form>

              {avatar !== null && avatar !== currentUser?.avatar && (
                <div>
                  <h5>Selected Avatar:</h5>
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="Selected Avatar"
                    width="100"
                    height="100"
                  />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
                disabled={isConfirmButtonDisabled}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
