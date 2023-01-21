import { yupResolver } from '@hookform/resolvers/yup';
import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createUpdateValidationSchema } from '../../consts/companyUser';
import { IUpdateCompanyUserModalProps } from '../../interfaces/modals/companyUser';
import SelectMultiple from 'react-select';
import { usePatchUser } from '../../controllers/user';
import { IUserCreatePatchPayload } from '../../interfaces/controllers/user';
import { companyUserRoleOptions } from '../../consts/common';

export const UpdateCompanyUserModal: FC<IUpdateCompanyUserModalProps> = ({
  pageNo,
  pageSize,
  selectedCompanyUser,
  showUpdateModal,
  setShowUpdateModal,
}) => {
  const { mutatePatchUser, isLoading } = usePatchUser(pageNo, pageSize);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    control,
  } = useForm<IUserCreatePatchPayload>({
    resolver: yupResolver(createUpdateValidationSchema),
  });

  const handleUpdate: SubmitHandler<Omit<IUserCreatePatchPayload, 'id'>> = (
    data
  ) => {
    mutatePatchUser(
      { id: selectedCompanyUser?.user.id, ...data },
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
            <Modal.Title>Update Company</Modal.Title>
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
                    defaultValue={selectedCompanyUser?.user.fullName}
                    className='form-control'
                    placeholder='Company Name'
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
                    defaultValue={selectedCompanyUser?.user.userName}
                    className='form-control'
                    placeholder='Short Name'
                  />
                  <small className='text-danger'>
                    {errors.userName?.message}
                  </small>
                </div>

                <div className='mb-3'>
                  <label className='form-label'>
                    Phone <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('phone')}
                    type='text'
                    defaultValue={selectedCompanyUser?.user.phone}
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
                    defaultValue={selectedCompanyUser?.user.email}
                    className='form-control'
                    placeholder='Email'
                  />
                  <small className='text-danger'>{errors.email?.message}</small>
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
                          defaultValue={companyUserRoleOptions.filter(
                            (option) =>
                              selectedCompanyUser.user.role?.includes(
                                option.value
                              )
                          )}
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
