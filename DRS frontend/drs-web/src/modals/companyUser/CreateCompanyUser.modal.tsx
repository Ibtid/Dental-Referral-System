import { yupResolver } from '@hookform/resolvers/yup';
import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createPostValidationSchema } from '../../consts/companyUser';
import { ICreateModalProps } from '../../interfaces/modals/common';
import { usePostUser } from '../../controllers/user';
import { IUserCreatePostPayload } from '../../interfaces/controllers/user';
import SelectMultiple from 'react-select';
import { companyUserRoleOptions } from '../../consts/common';

export const CreateCompanyUserModal: FC<ICreateModalProps> = ({
  pageSize,
  setPageNo,
  showCreateModal,
  setShowCreateModal,
}) => {
  const { mutatePostUser, isLoading } = usePostUser(pageSize, setPageNo);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    control,
  } = useForm<IUserCreatePostPayload>({
    resolver: yupResolver(createPostValidationSchema),
  });

  const handleCreate: SubmitHandler<Omit<IUserCreatePostPayload, 'id'>> = (
    data
  ) => {
    mutatePostUser(
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
            <Modal.Title>Add Company User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-12'>
                <div className='mb-3'>
                  <label className='form-label'>
                    FullName <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('fullName')}
                    type='text'
                    className='form-control'
                    placeholder='FullName'
                  />
                  <small className='text-danger'>
                    {errors.fullName?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    User Name <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('userName')}
                    type='text'
                    className='form-control'
                    placeholder='Short Name'
                  />
                  <small className='text-danger'>
                    {errors.userName?.message}
                  </small>
                </div>

                <div className='mb-3'>
                  <label className='form-label'>
                    Phone<span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('phone')}
                    type='text'
                    className='form-control'
                    placeholder='Phone Number'
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
                  <label className='form-label'>
                    Password <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('password')}
                    type='password'
                    className='form-control'
                    placeholder='Password'
                  />
                  <small className='text-danger'>
                    {errors.password?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Confirm Password</label>
                  <input
                    {...register('confirmPassword')}
                    type='Confirm Password'
                    className='form-control'
                    placeholder='Confirm Password'
                  />
                  <small className='text-danger'>
                    {errors.confirmPassword?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Role <span className='text-danger'>*</span>
                  </label>

                  <Controller
                    name='role'
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <SelectMultiple
                          options={companyUserRoleOptions}
                          placeholder={'Choose...'}
                          isMulti={true}
                          onChange={(options) =>
                            onChange(options?.map((option) => option.value))
                          }
                          onBlur={onBlur}
                          value={companyUserRoleOptions.filter((option) =>
                            value?.includes(option.value)
                          )}
                        />
                      );
                    }}
                  />
                  <small className='text-danger'>{errors.role?.message}</small>
                </div>

                {/* <div className='mb-3'>
                  <label className='form-label'>Status</label>
                  <Controller
                    name='status'
                    defaultValue={selectedCompanyUser?.status}
                    control={control}
                    render={({ field: { name, onChange, ref, value } }) => (
                      <Select
                        ref={ref}
                        name={name}
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        filterOption={createFilter(reactSelectFilterConfig)}
                        value={statusOptions?.find(
                          (option: IOption) => option.value === value
                        )}
                        options={statusOptions}
                        onChange={(selectedOption: SingleValue<IOption>) => {
                          onChange(selectedOption?.value);
                        }}
                      />
                    )}
                  />
                  <small className='text-danger'>
                    {errors.status?.message}
                  </small>
                </div> */}
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
