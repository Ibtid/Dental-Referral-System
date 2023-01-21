import { yupResolver } from '@hookform/resolvers/yup';
import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { changePasswordValidationSchema } from '../../consts/auth/changePasswordValidationSchema';
import { useChangePassword } from '../../controllers/auth/useChangePassword';
import { IChangePasswordPayload } from '../../interfaces/controllers/auth/changePasswordPayload.interface';
import { IChangePasswordModalProps } from '../../interfaces/modals/common/changePasswordModal.interface';

export const CreateChangePasswordModal: FC<IChangePasswordModalProps> = ({
  showCreateModal,
  setShowCreateModal,
}) => {
  const { mutateChangePassword, isLoading } = useChangePassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IChangePasswordPayload>({
    resolver: yupResolver(changePasswordValidationSchema),
  });

  const handleCreate: SubmitHandler<IChangePasswordPayload> = (data) => {
    mutateChangePassword(
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
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-12'>
                <div className='mb-3'>
                  <label className='form-label'>
                    Current Password <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('oldPassword')}
                    type='text'
                    className='form-control'
                    placeholder='Current Password'
                  />
                  <small className='text-danger'>
                    {errors.oldPassword?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    New Password <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('newPassword')}
                    type='text'
                    className='form-control'
                    placeholder='New Password'
                  />
                  <small className='text-danger'>
                    {errors.newPassword?.message}
                  </small>
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Confirm New Password</label>
                  <input
                    {...register('confirmPassword')}
                    type='text'
                    className='form-control'
                    placeholder='Confirm New Password'
                  />
                  <small className='text-danger'>
                    {errors.confirmPassword?.message}
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
              Submit
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};
