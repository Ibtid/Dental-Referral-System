import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { usePatchPatient } from '../../controllers/patient';
import { yupResolver } from '@hookform/resolvers/yup';
import { IPatientCreatePatchPayload } from '../../interfaces/controllers/patient';
import { createUpdateValidationSchema } from '../../consts/patient';
import { IUpdatePatientModalProps } from '../../interfaces/modals/patient';
import Select, { SingleValue, createFilter } from 'react-select';
import { IOption } from '../../interfaces/common';
import { genderOptions, reactSelectFilterConfig } from '../../consts/common';

export const UpdatePatientModal: FC<IUpdatePatientModalProps> = ({
  pageNo,
  pageSize,
  selectedPatient,
  showUpdateModal,
  setShowUpdateModal,
}) => {
  const { mutatePatchPatient, isLoading } = usePatchPatient(pageNo, pageSize);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    control,
  } = useForm<IPatientCreatePatchPayload>({
    resolver: yupResolver(createUpdateValidationSchema),
  });

  const handleUpdate: SubmitHandler<Omit<IPatientCreatePatchPayload, 'id'>> = (
    data
  ) => {
    mutatePatchPatient(
      { id: selectedPatient?.id, ...data },
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
            <Modal.Title>Update Patient</Modal.Title>
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
                    defaultValue={selectedPatient?.name}
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
                    defaultValue={selectedPatient?.address}
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
                    defaultValue={selectedPatient?.gender}
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
                    defaultValue={selectedPatient?.age}
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
                    defaultValue={selectedPatient?.contactNumber}
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
                    defaultValue={selectedPatient?.email}
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
