import { FC, useState } from 'react';
import { IAmount } from '../../interfaces/components/addInvoice';

export const Amount: FC<IAmount> = ({
  selectedInvestigations,
  formData,
  setFormData,
  register,
  errors,
}: IAmount) => {
  let total = selectedInvestigations.reduce((accumulator, investigation) => {
    return accumulator + Number(investigation.cost);
  }, 0);

  // const [formData, setFormData] = useState<{ discount: number; paid: number }>({
  //   discount: 0,
  //   paid: 0,
  // });

  const changeFormData = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className='card custom-b-radius p-4 mb-3'>
      <div className='table-reponsive'>
        <table className='table table-borderless'>
          <thead>
            <tr>
              <th scope='col'>Test Name</th>
              <th scope='col' className='text-end'>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedInvestigations.map((investigation, index) => (
              <tr key={index}>
                <td>{investigation.name}</td>
                <td className='text-end'>{investigation.cost}</td>
              </tr>
            ))}
          </tbody>

          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className='border-top fw-bold'>Total</td>
              <td className='border-top fw-bold text-end'>{total}</td>
            </tr>
            <tr>
              <td className='fw-light'>
                <span>Discount</span>
                <input
                  {...register('discount')}
                  className='form-control w-25 border-5'
                  type='number'
                  pattern='^[0-9]*$'
                  name='discount'
                  value={formData.discount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    changeFormData(e);
                  }}
                />
                %
              </td>
              <td className='fw-light text-end'>
                {total * (formData.discount / 100)}
              </td>
            </tr>
            <small className='text-danger'>{errors.discount?.message}</small>
          </tbody>
          <tbody>
            <tr>
              <td className='border-top fw-bold'>Grand Total</td>
              <td className='border-top fw-bold text-end'>
                {total - total * (formData.discount / 100)}
              </td>
            </tr>
            <tr>
              <td className='fw-light'>Paid Amount</td>
              <input
                {...register('paid')}
                className='form-control w-50 border-5'
                type='number'
                name='paid'
                value={formData.paid}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  changeFormData(e);
                }}
              />
            </tr>
            {total - total * (formData.discount / 100) < formData.paid && (
              <small className='text-danger'>
                Cannot Pay more than required
              </small>
            )}

            {errors.paid && (
              <small className='text-danger'>{errors.paid.message}</small>
            )}
            <tr>
              <td className='border-top fw-bold'>Due</td>
              <td className='border-top fw-bold text-end'>
                {total - total * (formData.discount / 100) - formData.paid}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
