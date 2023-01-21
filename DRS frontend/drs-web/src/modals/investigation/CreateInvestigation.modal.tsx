import { yupResolver } from '@hookform/resolvers/yup';
import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createPostValidationSchema } from '../../consts/investigation';
import { usePostInvestigation } from '../../controllers/investigations';
import { IInvestigationCreatePostPayload } from '../../interfaces/controllers/investigations';

import { ICreateModalProps } from '../../interfaces/modals/common';

export const CreateInvestigationModal: FC<ICreateModalProps> = ({
  pageSize,
  setPageNo,
  showCreateModal,
  setShowCreateModal,
}) => {
  const { mutatePostInvestigation, isLoading } = usePostInvestigation(
    pageSize,
    setPageNo
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IInvestigationCreatePostPayload>({
    resolver: yupResolver(createPostValidationSchema),
  });

  const handleCreate: SubmitHandler<
    Omit<IInvestigationCreatePostPayload, 'id'>
  > = (data) => {
    mutatePostInvestigation(
      { ...data },
      {
        onSuccess: () => setShowCreateModal(false),
      }
    );
  };

  return (
    <Fragment>
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        centered>
        <form onSubmit={handleSubmit(handleCreate)}>
          <Modal.Header
            closeButton
            onHide={() => {
              clearErrors();
            }}>
            <Modal.Title>Create Investigation</Modal.Title>
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
                setShowCreateModal(false);
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
              Create
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};
