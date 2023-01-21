import { FC, useState } from 'react';
import { TLoginAs } from '../../../types/auth';
import LoginAsClinic from './LoginAsClinic.component';
import LoginAsPatient from './LoginAsPatient.component';
import LoginToDRS from './LoginToDRS.component';

export const Login: FC = () => {
  const [loginAs, setLoginAs] = useState<TLoginAs>();

  let loginAsComponent = null;

  if (loginAs === 'DRSUser') loginAsComponent = <LoginToDRS />;
  if (loginAs === 'Patient') loginAsComponent = <LoginAsPatient />;
  if (loginAs === 'ClinicUser') loginAsComponent = <LoginAsClinic />;

  const handleLoginAs = (value: TLoginAs) => {
    setLoginAs(value);
  };

  return (
    <div className='col-xl-6 col-lg-7 col-md-9 col-sm-12 col-12 my-auto'>
      <div className='row'>
        <div className='col-8 mx-auto mb-3'>
          <h1 className='text-center'>Welcome</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-8 mx-auto'>
          <button
            type='button'
            className='btn login-btn w-100 mt-3 py-3'
            onClick={() => handleLoginAs('DRSUser')}
          >
            Login To DRS
          </button>
          <button
            type='button'
            className='btn login-btn w-100 mt-3 py-3'
            onClick={() => handleLoginAs('ClinicUser')}
          >
            Login As Clinic
          </button>
          <button
            type='button'
            className='btn login-btn w-100 mt-3 py-3'
            onClick={() => handleLoginAs('Patient')}
          >
            Login As Patient
          </button>

          {loginAsComponent}
        </div>
      </div>
    </div>
  );
};
