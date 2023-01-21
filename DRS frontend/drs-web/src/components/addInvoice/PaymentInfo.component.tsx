import { FC } from 'react';
import { Controller } from 'react-hook-form';
import Select, { createFilter, SingleValue } from 'react-select';
import { paymentOptions, reactSelectFilterConfig } from '../../consts/common';
import { IOption } from '../../interfaces/common';
import { IPaymentInfo } from '../../interfaces/components/addInvoice';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export const PaymentInfo: FC<IPaymentInfo> = ({
  register,
  errors,
  control,
}: IPaymentInfo) => {
  return (
    <div className='card custom-b-radius p-4 mb-3'>
      <div className='mb-3'>
        <label className='form-label'>Mobile Number</label>
        <input
          {...register('mobileNumber')}
          type='text'
          className='form-control'
          placeholder='Mobile Number'
        />
        <small className='text-danger'>{errors.mobileNumber?.message}</small>
      </div>
      <div className='mb-3'>
        <label className='form-label'>Payment Method</label>
        <Controller
          name='paymentMethod'
          control={control}
          render={({ field: { name, onChange, ref, value } }) => (
            <Select
              ref={ref}
              name={name}
              components={{
                IndicatorSeparator: () => null,
              }}
              filterOption={createFilter(reactSelectFilterConfig)}
              value={paymentOptions?.find(
                (option: IOption) => option.value === value
              )}
              options={paymentOptions}
              onChange={(selectedOption: SingleValue<IOption>) => {
                onChange(selectedOption?.value);
              }}
            />
          )}
        />
        <small className='text-danger'>{errors.paymentMethod?.message}</small>
      </div>
      <div className='mb-3'>
        <label className='form-label'>Payment Description</label>
        <input
          {...register('paymentDescription')}
          type='text'
          className='form-control'
          placeholder='Description'
        />
        <small className='text-danger'>
          {errors.paymentDescription?.message}
        </small>
      </div>
      <div className='mb-3'>
        <label className='form-label'>Delivery Date</label>
        <Controller
          control={control}
          name='deliveryTime'
          render={({ field }) => (
            <DatePicker
              className='form-control'
              placeholderText='Select date'
              onChange={(date) => field.onChange(date)}
              selected={field.value}
            />
          )}
        />
        <small className='text-danger'>{errors.deliveryTime?.message}</small>
      </div>
    </div>
  );
};
