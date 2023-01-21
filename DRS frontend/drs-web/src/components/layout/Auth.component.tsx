import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: FC = () => {
  return (
    <div className='container login-page-ctl container align-items-center'>
      <div className='row d-flex  vh-100 mx-auto justify-content-center'>
        <div className='col-xl-6 col-lg-5 my-auto col-md-6 col-sm-12 col-12 d-xl-block d-lg-block d-md-none d-sm-none d-none'>
          <div className='row'>
            <div className='col-8 mx-auto'>
              <div className='p-4 text-center'>
                <img src='/img/site-logo-blue.svg' alt='logo' />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-lg-8 mx-auto'>
              <div className='login-image'>
                <img src='/img/login.png' alt='' className='img-fluid' />
              </div>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};
