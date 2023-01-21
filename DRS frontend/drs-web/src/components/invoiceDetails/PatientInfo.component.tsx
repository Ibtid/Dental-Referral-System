import { FC, Fragment } from 'react';
import { IInvoice } from '../../interfaces/controllers/invoice';

export const PatientInfo: FC<IInvoice> = (invoiceDetails: IInvoice) => {
  return (
    <Fragment>
      <div className='row mb-4 mt-4 px-3'>
        <div className='col-md-6'>
          <div className='row'>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4'>
              <p className='mb-1'>Report Id</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 col-xx-8'>
              <p className='mb-1 fw-light'>{invoiceDetails?.reportId}</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4'>
              <p className='mb-1'>Name</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 col-xx-8'>
              <p className='mb-1 fw-light'>{invoiceDetails?.patient?.name}</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4'>
              <p className='mb-1'>Age</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 col-xx-8'>
              <p className='mb-1 fw-light'>{invoiceDetails?.patient?.age}</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4'>
              <p className='mb-1'>Gender</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 col-xx-8'>
              <p className='mb-1 fw-light'>{invoiceDetails?.patient?.gender}</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4'>
              <p className='mb-1'>Address</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 col-xx-8'>
              <p className='mb-1 fw-light'>
                {invoiceDetails?.patient?.address}
              </p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4'>
              <p className='mb-1'>Contact</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 col-xx-8'>
              <p className='mb-1 fw-light'>{invoiceDetails?.mobileNumber}</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4'>
              <p className='mb-1'>Email</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 col-xx-8'>
              <p className='mb-1 fw-light'>{invoiceDetails?.patient?.email}</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4'>
              <p className='mb-1'>Reffered By</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 col-xx-8'>
              <p className='mb-1 fw-light'>{invoiceDetails?.clinic?.name}</p>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='row'>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4'>
              <p className='mb-1'>Gross Total</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 col-xx-8'>
              <p className='mb-1 fw-light'>{invoiceDetails?.grossTotal}</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4'>
              <p className='mb-1'>Discount</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 col-xx-8'>
              <p className='mb-1 fw-light'>{invoiceDetails?.discount}</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4'>
              <p className='mb-1'>Total</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 col-xx-8'>
              <p className='mb-1 fw-light'>{invoiceDetails?.total}</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4'>
              <p className='mb-1'>Paid</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 col-xx-8'>
              <p className='mb-1 fw-light'>{invoiceDetails?.paid}</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4'>
              <p className='mb-1'>Due</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 col-xx-8'>
              <p className='mb-1 fw-light'>{invoiceDetails?.due}</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 col-xxl-4'>
              <p className='mb-1'>Delivery Time</p>
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 col-xx-8'>
              <p className='mb-1 fw-light'>
                {invoiceDetails?.deliveryTime?.toString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
