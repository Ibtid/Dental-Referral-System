import { FC, Fragment, useState } from 'react';
import { useGetPatients } from '../../controllers/patient';
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import { CreatePatientModal } from '../../modals/patient';
import { IFindPatient } from '../../interfaces/components/addInvoice';

export const FindPatient: FC<IFindPatient> = ({
  searchData,
  setSearchData,
  setSelectedPatient,
  manualErrors,
  setManualErrors,
}: IFindPatient) => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const { patients, isLoading } = useGetPatients({
    pageNo: initialPageNo,
    pageSize: initialPageSize,
    searchData,
  });

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSearchData((previous) => {
      return { ...previous, patient: target.value };
    });
    setSelectedPatient(undefined);
    setManualErrors(undefined);
  };

  return (
    <Fragment>
      <div className='card custom-b-radius p-4 mb-3'>
        <h3 className='mb-4'>Find Patients</h3>
        <div className='row mb-2 align-items-lg-center'>
          <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8'>
            <div className='site-search dropdown'>
              <form
                id='dropdownsearchitems'
                className='d-flex form-control dropdown-toggle search-block py-0'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                <input
                  className='w-100 border-0 me-2'
                  type='text'
                  placeholder='Search Patient'
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
                {patients?.body.data.map((patient) => (
                  <li
                    className='my-3'
                    onClick={() => {
                      setSelectedPatient(patient);
                      setSearchData((previous) => {
                        return { ...previous, patient: patient.name };
                      });
                      setManualErrors(undefined);
                    }}>
                    {' '}
                    <a href='#'>
                      {' '}
                      {patient.contactNumber} {patient.name}
                    </a>{' '}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4'>
            <a
              href='#'
              onClick={() => {
                setShowCreateModal(true);
              }}
              className='btn cta-outline d-grid gap-2'
              data-bs-toggle='modal'
              data-bs-target='#exampleModal'>
              + Create New Patient
            </a>
          </div>
        </div>
        <small className='text-danger'>{manualErrors}</small>
      </div>
      {showCreateModal && (
        <CreatePatientModal
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
        />
      )}
    </Fragment>
  );
};
