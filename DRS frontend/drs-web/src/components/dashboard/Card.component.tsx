import { FC } from 'react';
import {
  useAccountsReport,
  useInpersonAppointments,
  useReferralAppointments,
} from '../../controllers/companyUser';

export const Card: FC = () => {
  const { referralAppointments } = useReferralAppointments();
  const { inpersonAppointments } = useInpersonAppointments();
  const { accountsReport } = useAccountsReport();

  return (
    <div className='container-fluid'>
      <div className='row mb-4'>
        <div className='col-lg-3 col-md-6 col-12  '>
          <div className='appointment-info py-2 mb-sm-3 mb-3 mb-md-3 mb-lg-0 '>
            <div className='row align-items-center'>
              <div className='col-5 '>
                <div className='info-title ps-3'>
                  <p className='appointment-info-text '>
                    Referral Appointments
                  </p>
                </div>
              </div>

              <div className='col-5 ms-auto'>
                <div className='total-appointment p-3 text-center'>
                  <h2>
                    {referralAppointments?.body.totalReferralAppointments}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-6 col-12  '>
          <div className='appointment-info person-appointments py-2 mb-sm-3 mb-3 mb-md-3 mb-lg-0'>
            <div className='row align-items-center'>
              <div className='col-5 '>
                <div className='info-title ps-3'>
                  <p className='appointment-info-text'>Inperson Appointments</p>
                </div>
              </div>

              <div className='col-5 ms-auto'>
                <div className='total-appointment p-3 text-center'>
                  <h2>
                    {inpersonAppointments?.body.totalInpersonAppointments}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-6 col-12  '>
          <div className='appointment-info paid-reports py-2 mb-sm-3 mb-3 mb-md-3 mb-lg-0'>
            <div className='row align-items-center'>
              <div className='col-5 '>
                <div className='info-title ps-3'>
                  <p className='appointment-info-text'>Net Amount</p>
                </div>
              </div>

              <div className='col-5 ms-auto'>
                <div className='total-appointment p-3 text-center'>
                  <h2>{accountsReport?.body?.netAmount}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-6 col-12  '>
          <div className='appointment-info due-report py-2 mb-sm-3 mb-3 mb-md-3 mb-lg-0'>
            <div className='row align-items-center'>
              <div className='col-5 '>
                <div className='info-title ps-3'>
                  <p className='appointment-info-text'>Discount Amount</p>
                </div>
              </div>

              <div className='col-5 ms-auto'>
                <div className='total-appointment py-3 px-0 text-center'>
                  <h2>{accountsReport?.body?.totalDiscountAmount}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
