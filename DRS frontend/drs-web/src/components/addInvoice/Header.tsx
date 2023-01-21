import { FC } from 'react';
import { IHeader } from '../../interfaces/components/addInvoice';
import { useNavigate } from 'react-router-dom';
import UiPaths from '../../paths/uiPaths';

export const Header: FC<IHeader> = ({ isLoading }: IHeader) => {
  const navigate = useNavigate();

  return (
    <div className='title d-flex justify-content-between align-items-center pb-3'>
      <p className=''>Add New Invoice</p>
      <div className='cta-group d-flex align-items-center'>
        <div
          className='me-5 cursor-pointer'
          onClick={() => {
            navigate(`/${UiPaths.Invoices}`);
          }}>
          {' '}
          Cancel
        </div>
        <button type='submit' className='btn btn-primary'>
          {isLoading && (
            <span
              className='spinner-border spinner-border-sm mx-3'
              role='status'
              aria-hidden='true'></span>
          )}
          Create Invoice
        </button>
      </div>
    </div>
  );
};
