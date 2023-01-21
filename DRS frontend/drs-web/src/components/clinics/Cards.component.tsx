import { FC } from 'react';
import { useGetClinicCardData } from '../../controllers/clinic';

export const Cards: FC = () => {
  const { clinicCardData, isLoading } = useGetClinicCardData();
  return (
    <div className='container-fluid'>
      <div className='row mb-4'>
        <div className='col-lg-4 col-md-6 col-12'>
          <div className='appointment-info py-3 mb-sm-3 mb-3 mb-md-3 mb-lg-0 '>
            <div className='row align-items-center'>
              <div className='col-5 '>
                <div className='info-title ps-3'>
                  <p className='appointment-info-text '>Referred Patients</p>
                </div>
              </div>

              <div className='col-5 ms-auto'>
                <div className='total-appointment p-3 text-center'>
                  <h2>{clinicCardData?.body.totalReferredPatient}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-lg-4 col-md-6 col-12  '>
          <div className='appointment-info person-appointments py-3 mb-sm-3 mb-3 mb-md-3 mb-lg-0'>
            <div className='row align-items-center'>
              <div className='col-5 '>
                <div className='info-title ps-3'>
                  <p className='appointment-info-text'>Investigation Count</p>
                </div>
              </div>

              <div className='col-5 ms-auto'>
                <div className='total-appointment p-3 text-center'>
                  <h2>
                    {clinicCardData?.body.investigationCount.reduce(
                      (accumulator, investigation) => {
                        return accumulator + investigation.count;
                      },
                      0
                    )}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className='col-lg-4 col-md-6 col-12  '>
          <div className='appointment-info paid-reports py-3 mb-sm-3 mb-3 mb-md-3 mb-lg-0'>
            <div className='row align-items-center'>
              <div className='col-5 '>
                <div className='info-title ps-3'>
                  <p className='appointment-info-text'>Due</p>
                </div>
              </div>

              <div className='col-5 ms-auto'>
                <div className='total-appointment p-3 text-center'>
                  <h2>31,670</h2>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
