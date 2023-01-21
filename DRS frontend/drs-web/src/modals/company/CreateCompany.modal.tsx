import { yupResolver } from '@hookform/resolvers/yup';
import { FC, Fragment, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

import { createPostValidationSchema } from '../../consts/company';
import { usePostCompany } from '../../controllers/company';

import { ICompanyCreatePostPayload } from '../../interfaces/controllers/company';
import { ICreateModalProps } from '../../interfaces/modals/common';

export const CreateCompanyModal: FC<ICreateModalProps> = ({
  pageSize,
  setPageNo,
  showCreateModal,
  setShowCreateModal,
}) => {
  const [file, setFile] = useState<Blob>();
  const onChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  };
  const { mutatePostCompany, isLoading } = usePostCompany(pageSize, setPageNo);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ICompanyCreatePostPayload>({
    resolver: yupResolver(createPostValidationSchema),
  });

  const handleCreate: SubmitHandler<Omit<ICompanyCreatePostPayload, 'id'>> = (
    data
  ) => {
    let finalData = new FormData();
    if (file !== undefined) {
      finalData.append('file', file!);
    }
    const dataArray = Object.entries(data);
    dataArray.map((singleData) => {
      finalData.append(singleData[0], singleData[1]);
    });
    mutatePostCompany(finalData, {
      onSuccess: () => setShowCreateModal(false),
    });
  };

  return (
    <Fragment>
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        centered
      >
        <form onSubmit={handleSubmit(handleCreate)}>
          <Modal.Header
            closeButton
            onHide={() => {
              clearErrors();
            }}
          >
            <Modal.Title>Create Company</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-12'>
                <div className='mb-3'>
                  <label className='form-label'>
                    Company Name <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('name')}
                    type='text'
                    className='form-control'
                    placeholder='Company Name'
                  />
                  <small className='text-danger'>{errors.name?.message}</small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Company Short Name <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('shortName')}
                    type='text'
                    className='form-control'
                    placeholder='Company Short Name'
                  />
                  <small className='text-danger'>
                    {errors.shortName?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Company Address <span className='text-danger'>*</span>
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
                    Company Contact No <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('contactNumber')}
                    type='text'
                    className='form-control'
                    placeholder='Contact Number'
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
                    className='form-control'
                    placeholder='Website'
                  />
                  <small className='text-danger'>
                    {errors.website?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Admin's Fullname <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('adminFullName')}
                    type='text'
                    className='form-control'
                    placeholder='adminFullName'
                  />
                  <small className='text-danger'>
                    {errors.adminFullName?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Admin's Username <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('username')}
                    type='text'
                    className='form-control'
                    placeholder='Username'
                  />
                  <small className='text-danger'>
                    {errors.username?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Admin's Email <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('adminEmail')}
                    type='text'
                    className='form-control'
                    placeholder='Email'
                  />
                  <small className='text-danger'>
                    {errors.adminEmail?.message}
                  </small>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Admin's Password <span className='text-danger'>*</span>
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
                  <label className='form-label'>
                    Admin's Phone Number <span className='text-danger'>*</span>
                  </label>
                  <input
                    {...register('adminPhone')}
                    type='text'
                    className='form-control'
                    placeholder='Phone Number'
                  />
                  <small className='text-danger'>
                    {errors.adminPhone?.message}
                  </small>
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Company Logo</label>
                  <input
                    type='file'
                    className='form-control'
                    onChange={(e) => onChangeFile(e)}
                  />
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
              }}
            >
              Close
            </button>
            <button type='submit' className='btn btn-primary'>
              {isLoading && (
                <span
                  className='spinner-border spinner-border-sm mx-3'
                  role='status'
                  aria-hidden='true'
                ></span>
              )}
              Create
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};
