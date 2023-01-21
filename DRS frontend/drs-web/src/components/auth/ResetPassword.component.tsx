import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { resetPasswordValidationSchema } from '../../consts/auth/resetPasswordValidationSchema';
import { useResetPassword } from '../../controllers/auth/useResetPassword';
import { IResetPasswordPayload } from '../../interfaces/controllers/auth/resetPasswordPayload.interface';

export const ResetPassword: FC = () => {
  const location = useLocation();
  const myState: any = location.state;
  const { mutateResetPassword, isLoading } = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordPayload>({
    resolver: yupResolver(resetPasswordValidationSchema),
  });

  const handleForgetPassword: SubmitHandler<IResetPasswordPayload> = (data) => {
    mutateResetPassword(data);
  };
  return (
    <div className='col-xl-6 col-lg-7 col-md-9 col-sm-12 col-12 my-auto'>
      <form onSubmit={handleSubmit(handleForgetPassword)}>
        <div className='form-floating my-3'>
          <input
            {...register('email')}
            type='hidden'
            value={myState?.email}
            className='form-control'
            id='floatingInput'
            placeholder='Email'
          />
          <label htmlFor='floatingInput' className='from-text'>
            Email
          </label>
          <small className='text-danger'>{errors.email?.message}</small>
        </div>
        <div className='form-floating my-3'>
          <input
            {...register('token')}
            type='text'
            className='form-control'
            id='floatingInput'
            placeholder='Token'
          />
          <label htmlFor='floatingInput' className='from-text'>
            Token
          </label>
          <small className='text-danger'>{errors.token?.message}</small>
        </div>
        <div className='form-floating my-3'>
          <input
            {...register('newPassword')}
            type='text'
            className='form-control'
            id='floatingInput'
            placeholder='New Password'
          />
          <label htmlFor='floatingInput' className='from-text'>
            New Password
          </label>
          <small className='text-danger'>{errors.newPassword?.message}</small>
        </div>
        <div className='form-floating my-3'>
          <input
            {...register('confirmPassword')}
            type='text'
            className='form-control'
            id='floatingInput'
            placeholder='Confirm New Password'
          />
          <label htmlFor='floatingInput' className='from-text'>
            Confirm New Password
          </label>
          <small className='text-danger'>
            {errors.confirmPassword?.message}
          </small>
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
