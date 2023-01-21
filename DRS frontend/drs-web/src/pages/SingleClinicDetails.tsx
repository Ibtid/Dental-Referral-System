import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetClinicById } from '../controllers/clinic';

const SingleClinicDetailsPage: FC = () => {
  const navigate = useNavigate();
  const { clinicId } = useParams();
  const { clinicDetails } = useGetClinicById(parseInt(clinicId!));

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12 '>
          <div className='patients-survey d-flex flex-column p-3'>
            <p className='title pb-3 mb-3'>
              <span onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                <img
                  src='/svg/arrow-back.svg'
                  alt='Back Icon'
                  height={30}
                  width={35}
                />
              </span>{' '}
              Clinic Details
            </p>

            <div className='clinic-profile-container container-fluid'>
              <div className='row'>
                <div className='col-12 col-sm-12 col-md-12 col-lg-7 col-xl-9 col-xxl-10'>
                  <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Name</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {clinicDetails?.body.name}
                      </p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Phone</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {clinicDetails?.body.phone}
                      </p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Mobile</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {clinicDetails?.body.mobile}
                      </p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Address</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {clinicDetails?.body.address}
                      </p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Email Address</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {clinicDetails?.body.email}
                      </p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Longitude</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {clinicDetails?.body.longitude}
                      </p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Latitude</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {clinicDetails?.body.latitude}
                      </p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Status</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {clinicDetails?.body.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleClinicDetailsPage;
