import { yupResolver } from '@hookform/resolvers/yup';
import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createUpdateValidationSchema } from '../../consts/clinic';
import { usePatchClinic } from '../../controllers/clinic';
import { IClinicCreatePatchPayload } from '../../interfaces/controllers/clinic';
import { IUpdateClinicModalProps } from '../../interfaces/modals/clinic';

export const UpdateClinicModal: FC<IUpdateClinicModalProps> = ({
  pageNo,
  pageSize,
  selectedClinic,
  showUpdateModal,
  setShowUpdateModal,
}) => {
  const { mutatePatchClinic, isLoading } = usePatchClinic(pageNo, pageSize);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IClinicCreatePatchPayload>({
    resolver: yupResolver(createUpdateValidationSchema),
  });

  const handleUpdate: SubmitHandler<Omit<IClinicCreatePatchPayload, 'id'>> = (
    data
  ) => {
    mutatePatchClinic(
      { id: selectedClinic?.id, ...data },
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
            <Modal.Title>Update Clinic</Modal.Title>
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
                    defaultValue={selectedClinic?.name}
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
                    defaultValue={selectedClinic?.address}
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
                    defaultValue={selectedClinic?.mobile}
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
                    defaultValue={selectedClinic?.phone}
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
                    defaultValue={selectedClinic?.email}
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
                    defaultValue={selectedClinic?.longitude}
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
                    defaultValue={selectedClinic?.latitude}
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
