import React from 'react';
import { updateAddress } from '../../../../../../../Service/Address';
import { editAddress } from '../../../../../../../Store/user';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export const ModelEditAddress = ({
  addressObj,
  editedAddress,
  setEditedAddress,
  editingAddressId,
  setEditingAddressId,
}) => {
  const dispatch = useDispatch();
  const editLocation = (addressId, editedAddress) => {
    updateAddress(addressId, { address: editedAddress })
      .then((res) => {
        if (res.data.success) {
          dispatch(editAddress(res.data.data));
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Something went wrong');
      });
  };
  const handleSaveChanges = (addressId) => {
    editLocation(addressId, editedAddress);
    setEditedAddress('');
    setEditingAddressId(null);
  };
  return (
    <>
      <div
        className="modal fade"
        id={`editModal-${addressObj.id}`}
        tabIndex="-1"
        aria-labelledby={`editModalLabel-${addressObj.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {' '}
                Edit Address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                className="add-location"
                type="text"
                placeholder="Edit your address..."
                value={
                  editingAddressId === addressObj.id
                    ? editedAddress
                    : addressObj.address
                }
                onChange={(e) => setEditedAddress(e.target.value)}
              />
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
                onClick={() => handleSaveChanges(addressObj.id)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
