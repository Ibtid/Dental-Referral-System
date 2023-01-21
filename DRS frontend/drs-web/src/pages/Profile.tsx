import { FC, Fragment, useState } from 'react';
import { getProfile } from '../controllers/auth/getProfile';
import { CreateChangePasswordModal } from '../modals/changePassword';

const ProfilePage: FC = () => {
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);
  const { userDetails } = getProfile();
  return (
    <Fragment>
      {showChangePasswordModal && (
        <CreateChangePasswordModal
          showCreateModal={showChangePasswordModal}
          setShowCreateModal={setShowChangePasswordModal}
        />
      )}
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 '>
            <div className='patients-survey d-flex flex-column p-3'>
              <p className='title pb-3 mb-3'>User Profile</p>

              <div className='clinic-profile-container container-fluid'>
                <div className='row'>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-7 col-xl-9 col-xxl-10'>
                    <div className='row'>
                      <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                        <p className='mb-3'>Full name</p>
                      </div>
                      <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                        <p className='mb-3 fw-light'>
                          {userDetails?.body.fullName}
                        </p>
                      </div>
                      <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                        <p className='mb-3'>Username</p>
                      </div>
                      <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                        <p className='mb-3 fw-light'>
                          {userDetails?.body.userName}
                        </p>
                      </div>
                      <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                        <p className='mb-3'>Phone</p>
                      </div>
                      <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                        <p className='mb-3 fw-light'>
                          {userDetails?.body.phone}
                        </p>
                      </div>
                      <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                        <p className='mb-3'>Role</p>
                      </div>
                      <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                        <p className='mb-3 fw-light'>
                          {userDetails?.body.role}
                        </p>
                      </div>
                      <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                        <p className='mb-3'>Email Address</p>
                      </div>
                      <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                        <p className='mb-3 fw-light'>
                          {userDetails?.body.email}
                        </p>
                      </div>
                      {userDetails?.body.companyUser?.company.name && (
                        <>
                          <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                            <p className='mb-3'>Company</p>
                          </div>
                          <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                            <p className='mb-3 fw-light'>
                              {userDetails?.body.companyUser?.company.name}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row mt-2'>
          <div className='col-12 '>
            <div className='d-flex flex-column py-3'>
              <p
                onClick={() => setShowChangePasswordModal(true)}
                className='btn btn-primary my-1 text-white'
              >
                Change Password
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfilePage;
