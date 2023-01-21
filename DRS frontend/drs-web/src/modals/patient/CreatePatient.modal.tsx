import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { usePostPatient } from '../../controllers/patient';
import { yupResolver } from '@hookform/resolvers/yup';
import { IPatientCreatePostPayload } from '../../interfaces/controllers/patient';
import { createUpdateValidationSchema } from '../../consts/patient';

import Select, { SingleValue, createFilter } from 'react-select';
import { IOption } from '../../interfaces/common';
import { genderOptions, reactSelectFilterConfig } from '../../consts/common';
import { ICreateModalProps } from '../../interfaces/modals/common';

export const CreatePatientModal: FC<ICreateModalProps> = ({
  pageSize,
  setPageNo,
  showCreateModal,
  setShowCreateModal,
}) => {
  const { mutatePostPatient, isLoading } = usePostPatient(pageSize, setPageNo);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    control,
  } = useForm<IPatientCreatePostPayload>({
    resolver: yupResolver(createUpdateValidationSchema),
  });

  const handleUpdate: SubmitHandler<Omit<IPatientCreatePostPayload, 'id'>> = (
    data
  ) => {
    mutatePostPatient(
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
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Modal.Header
            closeButton
            onHide={() => {
              clearErrors();
            }}>
            <Modal.Title>Create Patient</Modal.Title>
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
                    placeholder='Patient Name'
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
                    Gender <span className='text-danger'>*</span>
                  </label>
                  <Controller
                    name='gender'
                    control={control}
                    render={({ field: { name, onChange, ref, value } }) => (
                      <Select
                        ref={ref}
                        name={name}
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        filterOption={createFilter(reactSelectFilterConfig)}
                        value={genderOptions?.find(
                          (option: IOption) => option.value === value
                        )}
                        options={genderOptions}
                        onChange={(selectedOption: SingleValue<IOption>) => {
                          onChange(selectedOption?.value);
                        }}
                      />
                    )}
                  />
                  <small className='text-danger'>
                    {errors.gender?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Age <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('age')}
                    type='number'
                    className='form-control'
                    placeholder='Age'
                  />
                  <small className='text-danger'>{errors.age?.message}</small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Phone <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('contactNumber')}
                    type='text'
                    className='form-control'
                    placeholder='Phone No'
                  />
                  <small className='text-danger'>
                    {errors.contactNumber?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input
                    {...register('email')}
                    type='text'
                    className='form-control'
                    placeholder='Email'
                  />
                  <small className='text-danger'>{errors.email?.message}</small>
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
