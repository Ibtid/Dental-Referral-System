import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer.component';
import { TopNav } from './TopNav.component';

export const PatientLayout: FC = () => {
  return (
    <div className='main-wrapper d-flex '>
      <div className='content-wrapper d-flex flex-column w-100' id='main'>
        {/* <TopNav /> */}
        <div className='mainBody px-2 py-3 mt-2'>
          <Suspense fallback={<div>loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </div>
    </div>
  );
};
