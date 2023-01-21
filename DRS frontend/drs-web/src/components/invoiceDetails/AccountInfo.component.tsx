import { FC, Fragment } from 'react';
import { IInvoice } from '../../interfaces/controllers/invoice';

export const AccountInfo: FC<IInvoice> = (invoiceDetails: IInvoice) => {
  return (
    <Fragment>
      <big className='mb-4'>Account Info</big>
      <div className='row mb-4 mt-4'>
        <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
          <p className='mb-3'>Gross Total</p>
        </div>
        <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
          <p className='mb-3 fw-light'>{invoiceDetails?.grossTotal}</p>
        </div>
        <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
          <p className='mb-3'>Discount</p>
        </div>
        <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
          <p className='mb-3 fw-light'>{invoiceDetails?.discount}</p>
        </div>
        <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
          <p className='mb-3'>Total</p>
        </div>
        <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
          <p className='mb-3 fw-light'>{invoiceDetails?.total}</p>
        </div>
        <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
          <p className='mb-3'>Paid</p>
        </div>
        <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
          <p className='mb-3 fw-light'>{invoiceDetails?.paid}</p>
        </div>
        <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
          <p className='mb-3'>Due</p>
        </div>
        <div className='col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9 col-xx-10'>
          <p className='mb-3 fw-light'>{invoiceDetails?.due}</p>
        </div>
      </div>
    </Fragment>
  );
};
