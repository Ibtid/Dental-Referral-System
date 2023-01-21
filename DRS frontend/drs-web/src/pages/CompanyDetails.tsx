import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCompanyById } from '../controllers/company';

const CompanyDetailsPage: FC = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const { companyDetails } = useGetCompanyById(parseInt(companyId!));

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
              Company Details
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
                        {companyDetails?.body.name}
                      </p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Status</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {companyDetails?.body.status}
                      </p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Contact Number</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {companyDetails?.body.contactNumber}
                      </p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Email Address</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {companyDetails?.body.email}
                      </p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Website</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {companyDetails?.body.website}
                      </p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Address</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {companyDetails?.body.address}
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

export default CompanyDetailsPage;
