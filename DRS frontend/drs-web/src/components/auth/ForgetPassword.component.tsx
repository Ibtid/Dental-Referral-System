import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { forgetPasswordValidationSchema } from '../../consts/auth/forgetPasswordValidationSchema';
import { useForgetPassword } from '../../controllers/auth/useForgetPassword';
import { IForgetPasswordPayload } from '../../interfaces/controllers/auth/forgetPasswordPayload.interface';

export const ForgetPassword: FC = () => {
  const { mutateForgetPassword, isLoading } = useForgetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgetPasswordPayload>({
    resolver: yupResolver(forgetPasswordValidationSchema),
  });

  const handleForgetPassword: SubmitHandler<IForgetPasswordPayload> = (
    data
  ) => {
    mutateForgetPassword(data);
  };
  return (
    <div className='col-xl-6 col-lg-7 col-md-9 col-sm-12 col-12 my-auto'>
      <div className='row'>
        <div className='col-8 mx-auto mb-3'>
          <h2 className='text-center'>Please Enter Your Email</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleForgetPassword)}>
        <div className='form-floating my-3'>
          <input
            {...register('email')}
            type='text'
            className='form-control'
            id='floatingInput'
            placeholder='Email'
          />
          <label htmlFor='floatingInput' className='from-text'>
            Email
          </label>
          <small className='text-danger'>{errors.email?.message}</small>
        </div>
        <button
          type='submit'
          className='btn login-btn w-100 mt-3 py-3'
          disabled={isLoading}
        >
          {isLoading && (
            <span
              className='spinner-border spinner-border-sm mx-3'
              role='status'
              aria-hidden='true'
            ></span>
          )}
          Submit
        </button>
      </form>
    </div>
  );
};
