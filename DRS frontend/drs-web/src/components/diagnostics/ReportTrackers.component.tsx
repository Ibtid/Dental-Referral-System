import { FC } from 'react';

export const ReportTrackers: FC = () => {
  return (
    <div className='container-fluid'>
      <div className='row mb-4'>
        <div className='col-7 '>
          <div className='patients-survey d-flex flex-column p-3'>
            <p className='title pb-3'>Reports Trackers</p>
            <div className='patients-survey-graph pt-3'>
              <img
                src='../img/hospital-report.png'
                className='img-fluid'
                alt=''
              />
            </div>
          </div>
        </div>
        <div className='col-5 '>
          <div className='patients-survey d-flex flex-column p-3'>
            <p className='title pb-3'>Reports Trackers</p>
            <div className='patients-survey-graph d-flex justify-content-center pt-3'>
              <img
                src='../img/hospital-analytics-growth.png'
                className='img-fluid'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
