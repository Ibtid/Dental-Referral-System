import { yupResolver } from '@hookform/resolvers/yup';
import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createUpdateValidationSchema } from '../../consts/investigation';
import { usePatchInvestigation } from '../../controllers/investigations';
import { IInvestigationCreatePatchPayload } from '../../interfaces/controllers/investigations';
import { IUpdateInvestigationModalProps } from '../../interfaces/modals/investigation';

export const UpdateInvestigationModal: FC<IUpdateInvestigationModalProps> = ({
  pageNo,
  pageSize,
  selectedInvestigation,
  showUpdateModal,
  setShowUpdateModal,
}) => {
  const { mutatePatchInvestigation, isLoading } = usePatchInvestigation(
    pageNo,
    pageSize
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IInvestigationCreatePatchPayload>({
    resolver: yupResolver(createUpdateValidationSchema),
  });

  const handleUpdate: SubmitHandler<
    Omit<IInvestigationCreatePatchPayload, 'id'>
  > = (data) => {
    mutatePatchInvestigation(
      { id: selectedInvestigation?.id, ...data },
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
            <Modal.Title>Update Investigation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-12'>
                <div className='mb-3'>
                  <label className='form-label'>
                    Name <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('name')}
                    type='text'
                    defaultValue={selectedInvestigation?.name}
                    className='form-control'
                    placeholder='Investigation Name'
                  />
                  <small className='text-danger'>{errors.name?.message}</small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Category <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('category')}
                    type='text'
                    defaultValue={selectedInvestigation?.category}
                    className='form-control'
                    placeholder='Category'
                  />
                  <small className='text-danger'>
                    {errors.category?.message}
                  </small>
                </div>

                <div className='mb-3'>
                  <label className='form-label'>
                    Description <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('description')}
                    type='text'
                    defaultValue={selectedInvestigation?.description}
                    className='form-control'
                    placeholder='Description'
                  />
                  <small className='text-danger'>
                    {errors.description?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Reference Value</label>
                  <input
                    {...register('referenceValue')}
                    type='text'
                    defaultValue={selectedInvestigation?.referenceValue}
                    className='form-control'
                    placeholder='Reference Value'
                  />
                  <small className='text-danger'>
                    {errors.referenceValue?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Cost <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('cost')}
                    type='float'
                    onKeyPress={(event) => {
                      if (!/[0-9]|\./.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    defaultValue={selectedInvestigation?.cost}
                    className='form-control'
                    placeholder='Cost'
                  />
                  <small className='text-danger'>{errors.cost?.message}</small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Comission <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('comission')}
                    type='float'
                    onKeyPress={(event) => {
                      if (!/[0-9]|\./.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    defaultValue={selectedInvestigation?.comission}
                    className='form-control'
                    placeholder='Comission'
                  />
                  <small className='text-danger'>
                    {errors.comission?.message}
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
              Update
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};
