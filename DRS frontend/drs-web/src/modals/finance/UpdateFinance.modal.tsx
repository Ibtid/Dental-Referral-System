import { yupResolver } from '@hookform/resolvers/yup';
import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createUpdateValidationSchema } from '../../consts/finance';
import { usePatchFinance } from '../../controllers/invoice';
import { IFinanceCreatePatchPayload } from '../../interfaces/controllers/finance';
import { IPaymentModalProps } from '../../interfaces/modals/finance';

export const UpdateFinanceModal: FC<IPaymentModalProps> = ({
  pageNo,
  pageSize,
  selectedFinanceId,
  showUpdateModal,
  setShowUpdateModal,
}) => {
  //   const { mutatePatchClinic, isLoading } = usePatchClinic();
  const { mutatePatchFinance, isLoading } = usePatchFinance(pageNo, pageSize);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IFinanceCreatePatchPayload>({
    resolver: yupResolver(createUpdateValidationSchema),
  });

  const handleUpdate: SubmitHandler<Omit<IFinanceCreatePatchPayload, 'id'>> = (
    data
  ) => {
    mutatePatchFinance(
      { id: selectedFinanceId, ...data },
      {
        onSuccess: () => setShowUpdateModal(false),
      }
    );
  };

  return (
    <Fragment>
      <Modal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        centered>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Modal.Header
            closeButton
            onHide={() => {
              clearErrors();
            }}>
            <Modal.Title>Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-12'>
                <div className='mb-3'>
                  <label className='form-label'>Amount</label>
                  <input
                    {...register('amount')}
                    type='number'
                    className='form-control'
                    placeholder='Amount'
                  />
                  <small className='text-danger'>
                    {errors.amount?.message}
                  </small>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type='button'
              className='btn cta-outline'
              onClick={() => {
                setShowUpdateModal(false);
                clearErrors();
              }}>
              Close
            </button>
            <button type='submit' className='btn btn-primary'>
              {isLoading && (
                <span
                  className='spinner-border spinner-border-sm mx-3'
                  role='status'
                  aria-hidden='true'></span>
              )}
              Pay
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};
