import { FC, useState } from 'react';
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import { useGetClinics } from '../../controllers/clinic';
import { IFindClinic } from '../../interfaces/components/addInvoice';

export const FindClinic: FC<IFindClinic> = ({
  searchData,
  setSearchData,
  selectedClinic,
  setSelectedClinic,
}: IFindClinic) => {
  const [referred, setReferred] = useState<boolean>(true);

  const { clinics, isLoading } = useGetClinics({
    pageNo: initialPageNo,
    pageSize: initialPageSize,
    searchData,
  });

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSearchData((previous) => {
      return { ...previous, clinic: target.value };
    });
  };
  return (
    <div className='card custom-b-radius p-4 mb-3'>
      <h3 className='mb-3'>Find Clinic</h3>
      <div className='row'>
        <div className='col-12 radio-tabs-block'>
          <div className='d-flex align-items-center'>
            <h3 className='me-5'>
              Referral <span className='text-danger required'>*</span>{' '}
            </h3>
            <ul className='nav nav-pills' id='pills-tab' role='tablist'>
              <li className='nav-item' role='presentation'>
                <button
                  className='nav-link active'
                  id='pills-home-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#pills-home'
                  type='button'
                  role='tab'
                  aria-controls='pills-home'
                  aria-selected='true'
                  onClick={() => {
                    setReferred(true);
                  }}>
                  <div className='htmlForm-check htmlForm-check-inline'>
                    <input
                      className='htmlForm-check-input'
                      type='radio'
                      name='inlineRadioOptions'
                      id='inlineRadio2'
                      value='option2'
                      checked={referred}
                    />
                    <label
                      className='htmlForm-check-label'
                      htmlFor='inlineRadio2'>
                      Clinic
                    </label>
                  </div>
                </button>
              </li>
              <li className='nav-item' role='presentation'>
                <button
                  className='nav-link'
                  id='pills-profile-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#pills-profile'
                  type='button'
                  role='tab'
                  aria-controls='pills-profile'
                  onClick={() => {
                    setReferred(false);
                    setSelectedClinic(undefined);
                    setSearchData((previous) => {
                      return { ...previous, clinic: '' };
                    });
                  }}
                  aria-selected='false'>
                  <div className='htmlForm-check htmlForm-check-inline'>
                    <input
                      className='htmlForm-check-input'
                      type='radio'
                      name='inlineRadioOptions'
                      id='inlineRadio1'
                      value='option1'
                      checked={!referred}
                    />
                    <label
                      className='htmlForm-check-label'
                      htmlFor='inlineRadio1'>
                      Self
                    </label>
                  </div>
                </button>
              </li>
            </ul>
          </div>
          <div className='tab-content' id='pills-tabContent'>
            <div
              className='tab-pane fade show active my-3'
              id='pills-home'
              role='tabpanel'
              aria-labelledby='pills-home-tab'>
              <div className='site-search dropdown'>
                <form
                  id='dropdownsearchitems'
                  className='d-flex form-control dropdown-toggle search-block py-0'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  <input
                    className='w-100 border-0 me-2 '
                    type='text'
                    placeholder='Search Clinic'
                    aria-label='Search'
                    value={searchData}
                    onChange={(e) => handleSearch(e)}
                  />
                  <button className='btn' type='submit'>
                    <img
                      src='../img/search.svg'
                      alt='Search'
                      className='svg-icon'
                    />
                  </button>
                </form>
                <ul
                  className='dropdown-menu px-3 w-100'
                  aria-labelledby='dropdownsearchitems'>
                  {clinics?.body.data.map((clinic) => (
                    <li
                      className='my-3'
                      onClick={() => {
                        setSelectedClinic(clinic);
                        setSearchData((previous) => {
                          return { ...previous, clinic: clinic.name };
                        });
                      }}>
                      {' '}
                      <a href='#'>
                        {' '}
                        {clinic.mobile} {clinic.name}
                      </a>{' '}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className='tab-pane fade'
              id='pills-profile'
              role='tabpanel'
              aria-labelledby='pills-profile-tab'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
