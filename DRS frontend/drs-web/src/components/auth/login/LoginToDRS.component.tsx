import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLogin } from '../../../controllers/auth';
import { ILoginPayload } from '../../../interfaces/controllers/auth';
import { loginValidationSchema } from '../../../consts/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import UiPaths from '../../../paths/uiPaths';

const LoginToDRS: FC = () => {
  const { mutateLogin, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPayload>({
    resolver: yupResolver(loginValidationSchema),
  });

  const handleLogin: SubmitHandler<ILoginPayload> = (data) => {
    mutateLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
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
      <div className='form-floating'>
        <input
          {...register('password')}
          type='password'
          className='form-control'
          id='floatingPassword'
          placeholder='Password'
        />
        <label htmlFor='floatingPassword' className='from-text'>
          Password
        </label>
        <small className='text-danger'>{errors.password?.message}</small>
      </div>
      <div className='d-flex my-3'>
        <div className='form-check me-auto'>
          <input
            className='form-check-input'
            type='checkbox'
            value=''
            id='flexCheckDefault'
          />
          <label
            className='form-check-label from-text'
            htmlFor='flexCheckDefault'
          >
            Remember me
          </label>
        </div>
        <Link to={UiPaths.ForgetPassword} className='forget-pass'>
          Forget Password?
        </Link>
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
        Login
      </button>
    </form>
  );
};

export default LoginToDRS;
