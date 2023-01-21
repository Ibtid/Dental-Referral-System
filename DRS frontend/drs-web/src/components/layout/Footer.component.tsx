import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <p className='text-end py-2 px-2 mb-0'>
              Developed by
              <a href='#' className=''>
                {' '}
                Kaz Software Limited
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
