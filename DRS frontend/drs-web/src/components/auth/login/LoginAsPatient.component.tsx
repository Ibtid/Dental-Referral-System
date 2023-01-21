import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginAsPatient } from '../../../controllers/auth';
import { loginAsPatientValidationSchema } from '../../../consts/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { ILoginAsPatientPayload } from '../../../interfaces/controllers/auth';
import { StoragePatientAuth } from '../../../core/localStorage';

const LoginAsPatient: FC = () => {
  const { mutateLoginAsPatient, isLoading } = useLoginAsPatient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginAsPatientPayload>({
    resolver: yupResolver(loginAsPatientValidationSchema),
  });

  const handleLoginAsPatient: SubmitHandler<ILoginAsPatientPayload> = (
    data
  ) => {
    mutateLoginAsPatient(data, {
      onSuccess: (res, variables) => {
        if (res.isSuccess) {
          const { reportId, mobileNumber } = variables;
          StoragePatientAuth.reportId = reportId;
          StoragePatientAuth.mobileNumber = mobileNumber;
        }
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(handleLoginAsPatient)}>
      <div className='form-floating my-3'>
        <input
          {...register('reportId')}
          type='text'
          className='form-control'
          id='floatingInputReport'
          placeholder='Report ID'
        />
        <label htmlFor='floatingInputReport' className='from-text'>
          Report ID
        </label>
        <small className='text-danger'>{errors.reportId?.message}</small>
      </div>
      <div className='form-floating my-3'>
        <input
          {...register('mobileNumber')}
          type='text'
          className='form-control'
          id='floatingInputMobile'
          placeholder='Mobile Number'
        />
        <label htmlFor='floatingInputMobile' className='from-text'>
          Mobile Number
        </label>
        <small className='text-danger'>{errors.mobileNumber?.message}</small>
      </div>

      <button
        type='submit'
        className='btn login-btn w-100 py-3'
        disabled={isLoading}
      >
        {isLoading && (
          <span
            className='spinner-border spinner-border-sm mx-3'
            role='status'
            aria-hidden='true'
          ></span>
        )}
        View Report
      </button>
    </form>
  );
};

export default LoginAsPatient;
