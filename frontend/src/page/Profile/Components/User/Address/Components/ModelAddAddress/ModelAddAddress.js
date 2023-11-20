import React from 'react';
import { createAddress } from '../../../../../../../Service/Address';
import { addNewAddress } from '../../../../../../../Store/user';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export const ModelAddAddress = ({ newAddress, setNewAddress }) => {
  const dispatch = useDispatch();
  const addNewLocation = () => {
    createAddress({ address: newAddress })
      .then((response) => {
        if (response.data.success) {
          dispatch(addNewAddress(response.data.data));
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Something went wrong');
      });
  };
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
                Add new location
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
                placeholder="Add your new location..."
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
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
                onClick={addNewLocation}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
