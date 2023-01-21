import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  useLoginAsClinic,
  useLoginAsClinicVerify,
} from '../../../controllers/auth';
import {
  ILoginAsClinicCodePayload,
  ILoginAsClinicPayload,
} from '../../../interfaces/controllers/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  loginAsClinicCodeValidationSchema,
  loginAsClinicValidationSchema,
} from '../../../consts/auth';
import { errorToast } from '../../../libs/toast';

const LoginAsClinic: FC = () => {
  const [mobile, setMobile] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const { mutateLoginAsClinic, isLoadingLoginAsClinic, loginAsClinicData } =
    useLoginAsClinic();
  const { refetchLoginAsClinicVerify, isLoadingLoginAsClinicVerify } =
    useLoginAsClinicVerify({ mobile, code });

  const {
    register: registerMobile,
    handleSubmit: handleSubmitMobile,
    formState: { errors: errorsMobile },
  } = useForm<ILoginAsClinicPayload>({
    resolver: yupResolver(loginAsClinicValidationSchema),
  });

  const {
    handleSubmit: handleSubmitCode,
    control,
    formState: { errors: errorsCode },
  } = useForm<ILoginAsClinicCodePayload>({
    resolver: yupResolver(loginAsClinicCodeValidationSchema),
  });

  const handleLoginAsClinic: SubmitHandler<ILoginAsClinicPayload> = (data) => {
    mutateLoginAsClinic(data, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          setMobile(data.mobile);
        } else {
          errorToast(res.message);
        }
      },
    });
  };

  const handleLoginAsClinicCode = () => {
    refetchLoginAsClinicVerify();
  };

  if (!mobile) {
    return (
      <form onSubmit={handleSubmitMobile(handleLoginAsClinic)}>
        <div className='form-floating my-3'>
          <input
            {...registerMobile('mobile')}
            type='text'
            className='form-control'
            id='floatingInput'
            placeholder='Mobile'
          />
          <label htmlFor='floatingInput' className='from-text'>
            Mobile
          </label>
          <small className='text-danger'>{errorsMobile.mobile?.message}</small>
        </div>

        <button
          type='submit'
          className='btn login-btn w-100 py-3'
          disabled={isLoadingLoginAsClinic}
        >
          {isLoadingLoginAsClinic && (
            <span
              className='spinner-border spinner-border-sm mx-3'
              role='status'
              aria-hidden='true'
            ></span>
          )}
          Get OTP
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmitCode(handleLoginAsClinicCode)}>
      {loginAsClinicData?.isSuccess && (
        <div className='alert alert-success text-center' role='alert'>
          {loginAsClinicData?.message}
        </div>
      )}
      <div className='form-floating my-3'>
        <Controller
          control={control}
          name='code'
          render={({ field }) => {
            return (
              <input
                {...field}
                type='text'
                className='form-control'
                id='floatingInput'
                placeholder='Code'
                onChange={(event) => {
                  setCode(event.target.value);
                  field.onChange(event.target.value);
                }}
              />
            );
          }}
        />
        <label htmlFor='floatingInput' className='from-text'>
          Code
        </label>
        <small className='text-danger'>{errorsCode.code?.message}</small>
      </div>

      <button
        type='submit'
        className='btn login-btn w-100 py-3'
        disabled={isLoadingLoginAsClinicVerify}
      >
        {isLoadingLoginAsClinicVerify && (
          <span
            className='spinner-border spinner-border-sm mx-3'
            role='status'
            aria-hidden='true'
          ></span>
        )}
        Validate
      </button>
    </form>
  );
};

export default LoginAsClinic;
