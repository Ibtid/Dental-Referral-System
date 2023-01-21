import { yupResolver } from '@hookform/resolvers/yup';
import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createPostValidationSchema } from '../../consts/clinic';
import { usePostClinic } from '../../controllers/clinic';
import { IClinicCreatePostPayload } from '../../interfaces/controllers/clinic';
import { ICreateModalProps } from '../../interfaces/modals/common';

export const CreateClinicModal: FC<ICreateModalProps> = ({
  pageSize,
  setPageNo,
  showCreateModal,
  setShowCreateModal,
}) => {
  const { mutatePostClinic, isLoading } = usePostClinic(pageSize, setPageNo);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IClinicCreatePostPayload>({
    resolver: yupResolver(createPostValidationSchema),
  });

  const handleCreate: SubmitHandler<Omit<IClinicCreatePostPayload, 'id'>> = (
    data
  ) => {
    mutatePostClinic(
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
            <Modal.Title>Create Clinic</Modal.Title>
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
                    placeholder='Clinic Name'
                  />
                  <small className='text-danger'>{errors.name?.message}</small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Address <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('address')}
                    type='text'
                    className='form-control'
                    placeholder='Address'
                  />
                  <small className='text-danger'>
                    {errors.address?.message}
                  </small>
                </div>

                <div className='mb-3'>
                  <label className='form-label'>
                    Mobile <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('mobile')}
                    type='text'
                    className='form-control'
                    placeholder='Mobile No'
                  />
                  <small className='text-danger'>
                    {errors.mobile?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Phone</label>
                  <input
                    {...register('phone')}
                    type='text'
                    className='form-control'
                    placeholder='Phone No'
                  />
                  <small className='text-danger'>{errors.phone?.message}</small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Email <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('email')}
                    type='text'
                    className='form-control'
                    placeholder='Email'
                  />
                  <small className='text-danger'>{errors.email?.message}</small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Longitude</label>
                  <input
                    {...register('longitude')}
                    type='float'
                    onKeyPress={(event) => {
                      if (!/^-?\d*\.?\d{0,6}$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    className='form-control'
                    placeholder='Longitude'
                  />
                  <small className='text-danger'>
                    {errors.longitude?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Latitude</label>
                  <input
                    {...register('latitude')}
                    type='float'
                    onKeyPress={(event) => {
                      if (!/^-?\d*\.?\d{0,6}$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    className='form-control'
                    placeholder='Latitude'
                  />
                  <small className='text-danger'>
                    {errors.latitude?.message}
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
