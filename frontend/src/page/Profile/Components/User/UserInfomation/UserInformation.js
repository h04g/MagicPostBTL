import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { ModalUpdateUser } from './Components/ModalUpdateUser/ModalUpdateUser';
import { Loading } from '../../../../../common/Components/Default/Loading';
import { useSelector } from 'react-redux';
import { Address } from '../Address/Address';
export const UserInformation = ({ selectedOption, setSelectedOption }) => {
  const currentUser = useSelector((state) => state.userReducer);
  const [isLoading, setIsloading] = useState(false);

  return (
    <>
      <div className="profile">
        <div className="profile-title">
          <h4>Your Account</h4>
        </div>
        <div className="profile-options">
          <button
            className={`btn profile-option-btn ${
              selectedOption === 'user' ? 'active' : ''
            }`}
            onClick={() => setSelectedOption('user')}
          >
            User Info
          </button>
          <button
            className={`btn profile-option-btn ${
              selectedOption === 'address' ? 'active' : ''
            }`}
            onClick={() => setSelectedOption('address')}
          >
            Address
          </button>
        </div>
        <div className="profile-detail col-12">
          {selectedOption === 'user' && (
            <>
              <div className="profile-img col-4">
                <Avatar
                  key={currentUser?.avatar}
                  name={currentUser?.name}
                  size="100"
                  round={true}
                  src={currentUser?.avatar}
                  color={'green'}
                />
              </div>

              {isLoading ? (
                <Loading />
              ) : (
                <div className="profile-info col-8">
                  <table>
                    <tr>
                      <th>Name :</th>
                      <td>{currentUser?.name}</td>
                    </tr>
                    <tr>
                      <th>Email : </th>
                      <td>{currentUser?.email}</td>
                    </tr>
                    <tr>
                      <th>Phone : </th>
                      <td>{currentUser?.phone}</td>
                    </tr>

                    <tr>
                      <th>Role :</th>
                      <td>
                        {currentUser?.role_id == 1
                          ? 'Buyer'
                          : currentUser?.role_id == 2
                          ? 'Seller'
                          : null}
                      </td>
                    </tr>
                  </table>
                  <div
                    className="update-profile"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '20px',
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          {selectedOption === 'address' && <Address />}
        </div>
      </div>
      <ModalUpdateUser isLoading={isLoading} setIsloading={setIsloading} />
    </>
  );
};
