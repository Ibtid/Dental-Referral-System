import { FC } from 'react';
import { useGetPatientDetails } from '../../controllers/patient/useGetPatientDetails';
import { StoragePatientAuth } from '../../core/localStorage';

export const PatientDetails: FC = () => {
  const { patientDetails } = useGetPatientDetails(
    StoragePatientAuth.reportId!,
    StoragePatientAuth.mobileNumber!
  );
  console.log(patientDetails?.body);
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12 '>
          <div className='patients-survey d-flex flex-column p-3'>
            <p className='title pb-3 mb-3'>Patient Details</p>

            <div className='clinic-profile-container container-fluid'>
              <div className='row'>
                <div className='col-12 col-sm-12 col-md-12 col-lg-7 col-xl-9 col-xxl-10'>
                  <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Patient Name</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {patientDetails?.body.patient.name}
                      </p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Report Id</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {patientDetails?.body.reportId}
                      </p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                      <p className='mb-3'>Mobile Number</p>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
                      <p className='mb-3 fw-light'>
                        {patientDetails?.body.mobileNumber}
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
