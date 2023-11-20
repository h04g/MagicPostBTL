import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAddress, getAddress } from '../../../../../Service/Address';
import { deleteOldAddress, initAddress } from '../../../../../Store/user';
import { toast } from 'react-toastify';

export const UseAddressHook = () => {
  const [newAddress, setNewAddress] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [editingAddressId, setEditingAddressId] = useState(null);
  const address = useSelector((state) => state?.userReducer?.address) ?? [];
  const dispatch = useDispatch();

  useEffect(() => {
    getAddress()
      .then((res) => {
        if (res.data.success) {
          dispatch(initAddress(res.data.data.addresses));
        }
      })
      .catch((err) => {
        toast.error('something went wrong');
      });
  }, []);

  const handleEditAddress = (addressObj) => {
    setEditedAddress(addressObj.address);
    setEditingAddressId(addressObj.id);
  };

  const deleteLocation = (addressId) => {
    deleteAddress(addressId)
      .then((response) => {
        if (response.data.success) {
          dispatch(deleteOldAddress(addressId));
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error deleting Address', error);
        toast.error('Something went wrong');
      });
  };
  return {
    newAddress,
    setNewAddress,
    editedAddress,
    setEditedAddress,
    editingAddressId,
    address,
    handleEditAddress,
    deleteLocation,
  };
};
