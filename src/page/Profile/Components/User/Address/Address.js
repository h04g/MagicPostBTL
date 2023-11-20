import React from 'react';
import { ModelAddAddress } from './Components/ModelAddAddress/ModelAddAddress';
import { ModelEditAddress } from './Components/ModelEditAddress/ModelEditAddress';
import { UseAddressHook } from './UseAddressHook';

export const Address = () => {
  const {
    newAddress,
    setNewAddress,
    editedAddress,
    setEditedAddress,
    editingAddressId,
    address,
    handleEditAddress,
    deleteLocation,
  } = UseAddressHook();

  return (
    <div className="profile-address col-12">
      <h3>Address List</h3>
      <div className="add-location">
        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i className="fa-solid fa-plus"></i> Add new location
        </button>
        <ModelAddAddress
          newAddress={newAddress}
          setNewAddress={setNewAddress}
        />
      </div>
      <ul className="col-12">
        {address.map((addressObj, index) => (
          <li key={index}>
            {addressObj.address}{' '}
            <div className="address-button">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleEditAddress(addressObj)}
                data-bs-toggle="modal"
                data-bs-target={`#editModal-${addressObj.id}`}
              >
                Edit
              </button>
              <ModelEditAddress
                addressObj={addressObj}
                editedAddress={editedAddress}
                editingAddressId={editingAddressId}
                setEditedAddress={setEditedAddress}
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteLocation(addressObj.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
