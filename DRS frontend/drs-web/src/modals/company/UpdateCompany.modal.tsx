import { yupResolver } from '@hookform/resolvers/yup';
import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select, { SingleValue, createFilter } from 'react-select';
import { reactSelectFilterConfig, statusOptions } from '../../consts/common';
import { createUpdateValidationSchema } from '../../consts/company';
import { ICompanyCreatePatchPayload } from '../../interfaces/controllers/company';
import { IUpdateCompanyModalProps } from '../../interfaces/modals/company';
import { IOption } from '../../interfaces/common';
import { usePatchCompany } from '../../controllers/company';

export const UpdateCompanyModal: FC<IUpdateCompanyModalProps> = ({
  pageNo,
  pageSize,
  selectedCompany,
  showUpdateModal,
  setShowUpdateModal,
}) => {
  const { mutatePatchCompany, isLoading } = usePatchCompany(pageNo, pageSize);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    control,
  } = useForm<ICompanyCreatePatchPayload>({
    resolver: yupResolver(createUpdateValidationSchema),
  });

  const handleUpdate: SubmitHandler<Omit<ICompanyCreatePatchPayload, 'id'>> = (
    data
  ) => {
    mutatePatchCompany(
      { id: selectedCompany?.id, ...data },
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
                    Name <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('name')}
                    type='text'
                    defaultValue={selectedCompany?.name}
                    className='form-control'
                    placeholder='Company Name'
                  />
                  <small className='text-danger'>{errors.name?.message}</small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Short Name <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('shortName')}
                    type='text'
                    defaultValue={selectedCompany?.shortName}
                    className='form-control'
                    placeholder='Short Name'
                  />
                  <small className='text-danger'>
                    {errors.shortName?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Address <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('address')}
                    type='text'
                    defaultValue={selectedCompany?.address}
                    className='form-control'
                    placeholder='Address'
                  />
                  <small className='text-danger'>
                    {errors.address?.message}
                  </small>
                </div>

                <div className='mb-3'>
                  <label className='form-label'>
                    Contact <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('contactNumber')}
                    type='text'
                    defaultValue={selectedCompany?.contactNumber}
                    className='form-control'
                    placeholder='Contact No'
                  />
                  <small className='text-danger'>
                    {errors.contactNumber?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Email <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('email')}
                    type='text'
                    defaultValue={selectedCompany?.email}
                    className='form-control'
                    placeholder='Email'
                  />
                  <small className='text-danger'>{errors.email?.message}</small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Website</label>
                  <input
                    {...register('website')}
                    type='text'
                    defaultValue={selectedCompany?.website}
                    className='form-control'
                    placeholder='Website'
                  />
                  <small className='text-danger'>
                    {errors.website?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Status</label>
                  <Controller
                    name='status'
                    defaultValue={selectedCompany?.status}
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
