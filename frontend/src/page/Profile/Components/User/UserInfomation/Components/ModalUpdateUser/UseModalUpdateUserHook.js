import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateProfile } from '../../../../../../../Service/User/Index';
import { updateUser } from '../../../../../../../Store/user';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../../../../../Service/Firebase/File';

export const UseModalUpdateUserHook = (isLoading, setIsloading) => {
  const currentUser = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [name, setName] = useState(currentUser?.name);
  const [phone, setPhone] = useState(currentUser?.phone);
  const [role_id, setRole_id] = useState(currentUser?.role_id);
  const [wantToSell, setWantToSell] = useState(currentUser?.role_id === 2);
  const [avatar, setAvatar] = useState(currentUser?.avatar ?? null);
  const [phoneError, setPhoneError] = useState('');
  const handleSellCheckboxChange = () => {
    setWantToSell((prevWantToSell) => !prevWantToSell);
    const updatedRoleId = wantToSell ? 1 : 2;
    setRole_id(updatedRoleId);
  };
  const handlePhoneNumberChange = (value) => {
    const sanitizedValue = value.replace(/\D/g, '');

    setPhone(sanitizedValue);

    if (sanitizedValue.length === 10 || sanitizedValue.length === 11) {
      setPhoneError('');
    } else {
      setPhoneError('Phone number must be 10 or 11 digits');
    }
  };

  const isConfirmButtonDisabled = phoneError !== '' || (!phone || !phone.match(/^\d{10,11}$/));

  const update = (link) => {
    updateProfile({ name, phone, role_id, avatar: link })
      .then((res) => {
        if (res.data.success) {
          dispatch(updateUser({ name, phone, role_id, avatar: link }));
        }
      })
      .catch((err) => {
        toast.error('something went wrong');
        console.error(err);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    if (avatar !== null && avatar !== currentUser?.avatar) {
      uploadFile(avatar)
        .then((link) => {
          update(link);
        })
        .catch((err) => {
          toast.error('something went wrong');
          console.error(err);
        });
      return;
    }
    if (avatar === null) {
      update('');
      return;
    }
    update(avatar);
  };
  return {
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
  };
};
