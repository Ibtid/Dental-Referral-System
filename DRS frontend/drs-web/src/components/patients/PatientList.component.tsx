import { FC, Fragment, useState } from 'react';
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import { getColumns, patientTableOptionsConfig } from '../../consts/patient';
import { useDeletePatient, useGetPatients } from '../../controllers/patient';
import { IPatient } from '../../interfaces/controllers/patient';
import DeleteModal from '../../modals/common/DeleteModal.modal';
import { CreatePatientModal, UpdatePatientModal } from '../../modals/patient';
import CommonDataTable from '../common/CommonDataTable.component';

export const PatientList: FC = () => {
  // API states
  const [pageNo, setPageNo] = useState<number>(initialPageNo);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchData, setSearchData] = useState<string>('');

  // API hooks
  const { patients, isLoading } = useGetPatients({
    pageNo: pageNo,
    pageSize: pageSize,
    searchData,
  });
  const { mutateDeletePatient } = useDeletePatient({
    pageNo,
    pageSize,
    totalCount: patients?.body.totalCount!,
    setPageNo,
  });

  // component states
  const [selectedPatient, setselectedPatient] = useState<IPatient>();
  const [selectedPatientId, setselectedPatientId] = useState<number>();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const columns = getColumns({
    setShowUpdateModal,
    setShowDeleteModal,
    setselectedPatient,
    setselectedPatientId,
  });

  return (
    <Fragment>
      <CommonDataTable<IPatient>
        columns={columns}
        data={patients?.body.data}
        totalCount={patients?.body.totalCount}
        progressPending={isLoading}
        tableTitle='Patients'
        pageNo={pageNo}
        setPageNo={setPageNo}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setSearchData={setSearchData}
        tableOptionsConfig={patientTableOptionsConfig}
        createButton={
          <a
            onClick={() => setShowCreateModal(true)}
            href='#'
            className='btn btn-site-primary mb-md-0 mb-3'
            data-bs-toggle='modal'
            data-bs-target='#exampleModal2'>
            Add New Patient
          </a>
        }
      />

      {/* component modals */}
      {showUpdateModal && (
        <UpdatePatientModal
          pageNo={pageNo}
          pageSize={pageSize}
          selectedPatient={selectedPatient!}
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}
      {showCreateModal && (
        <CreatePatientModal
          pageSize={pageSize}
          setPageNo={setPageNo}
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal<IPatient>
          handleDelete={mutateDeletePatient}
          id={selectedPatientId!}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </Fragment>
    // <div className='container-fluid'>
    //   <div className='row'>
    //     <div className='col-12 '>
    //       <div className='patients-survey d-flex flex-column p-3'>
    //         <p className='title pb-3 mb-0'>Manage Patients</p>
    //         <button onClick={handlePost}>post</button>
    //         <button onClick={handlePatch}>patch</button>
    //         <button onClick={handleDel}>del</button>
    //         <button onClick={handleRefresh}>refresh token</button>
    //         <div className='py-3'>
    //           <div className='row'>
    //             <div className='col-12 col-sm-12 col-md-12 col-lg-4'></div>
    //             <div className='col-12 col-sm-12 col-md-12 col-lg-8'>
    //               <div className='row align-items-lg-center'>
    //                 <div className='col-12 col-lg-6 text-lg-end mb-3 mb-sm-3 mb-md-3 mb-lg-0'>
    //                   <div className='table-counter d-inline-block me-3'>
    //                     <span>Show</span>{' '}
    //                     <span>
    //                       <div className='dropdown d-inline-block'>
    //                         <a
    //                           className='btn btn-outline-secondary dropdown-toggle rounded-pill px-3 py-1 mx-1'
    //                           href='#'
    //                           role='button'
    //                           id='dropdownMenuLink'
    //                           data-bs-toggle='dropdown'
    //                           aria-expanded='false'
    //                         >
    //                           10
    //                         </a>

    //                         <ul
    //                           className='dropdown-menu '
    //                           aria-labelledby='dropdownMenuLink'
    //                         >
    //                           <li>
    //                             <a className='dropdown-item' href='#'>
    //                               10
    //                             </a>
    //                           </li>
    //                           <li>
    //                             <a className='dropdown-item' href='#'>
    //                               20
    //                             </a>
    //                           </li>
    //                           <li>
    //                             <a className='dropdown-item' href='#'>
    //                               30
    //                             </a>
    //                           </li>
    //                           <li>
    //                             <a className='dropdown-item' href='#'>
    //                               40
    //                             </a>
    //                           </li>
    //                           <li>
    //                             <a className='dropdown-item' href='#'>
    //                               50
    //                             </a>
    //                           </li>
    //                         </ul>
    //                       </div>
    //                     </span>
    //                     <span>entries</span>
    //                   </div>
    //                 </div>

    //                 <div className='col-12 col-lg-6'>
    //                   <div className='site-search dropdown'>
    //                     <form
    //                       id='dropdownsearchitems'
    //                       className='d-flex form-control dropdown-toggle search-block'
    //                       role='button'
    //                       data-bs-toggle='dropdown'
    //                       aria-expanded='false'
    //                     >
    //                       <input
    //                         className='w-100 border-0 me-2'
    //                         type='text'
    //                         placeholder='Search'
    //                         aria-label='Search'
    //                       />
    //                       <button className='btn p-0' type='submit'>
    //                         <img
    //                           src='../img/search.svg'
    //                           alt='Search'
    //                           className='svg-icon'
    //                         />
    //                       </button>
    //                     </form>
    //                     {/* <input className="form-control" type="text" placeholder="Search Patient" aria-label="Search">  */}
    //                     <ul
    //                       className='dropdown-menu px-3 w-100'
    //                       aria-labelledby='dropdownsearchitems'
    //                     >
    //                       <li className='my-3'>
    //                         {' '}
    //                         <a href='#'> +01########## Karim Arif</a>{' '}
    //                       </li>
    //                       <li className='my-3'>
    //                         {' '}
    //                         <a href='#'>
    //                           {' '}
    //                           +01########## Kibria Jaman Khan
    //                         </a>{' '}
    //                       </li>
    //                       <li className='my-3'>
    //                         {' '}
    //                         <a href='#'> +01########## Toufiq Afsan</a>{' '}
    //                       </li>
    //                       <li className='my-3'>
    //                         {' '}
    //                         <a href='#'> +01########## Jamil Reza</a>{' '}
    //                       </li>
    //                       <li className='my-3'>
    //                         {' '}
    //                         <a href='#'> +01########## Fahim Talukdar</a>{' '}
    //                       </li>
    //                     </ul>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className='pt-1 table-responsive'>
    //           <table className='appointment-table table table-striped'>
    //             <thead className='table-header'>
    //               <tr>
    //                 <th className='table-title py-3' scope='col'>
    //                   Name
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Address
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Disease
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Age
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Phone
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Emails
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Reports
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Action
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               <tr>
    //                 <th scope='row'>
    //                   <div className='d-flex align-items-center'>
    //                     <div className='doctor-img rounded-circle me-3'>
    //                       <img
    //                         src='../img/doc-profile.png'
    //                         className='img-fluid'
    //                       />
    //                     </div>
    //                     <div className='fw-normal'>Angelica</div>
    //                   </div>
    //                 </th>
    //                 <td>69/k, Panthopath, K.K. Bhaban</td>
    //                 <td>Cavities</td>
    //                 <td>24</td>
    //                 <td>+8801796636596</td>
    //                 <td>angelicaramos@example.com</td>
    //                 <td>
    //                   <div className='d-flex align-items-center'>
    //                     <span className='me-1'>
    //                       <img src='/img/gallery.svg' alt='gallery' />
    //                     </span>
    //                     <span className='me-1'>
    //                       <img src='/img/gallery.svg' alt='gallery' />
    //                     </span>
    //                     <span className='me-1'>
    //                       <img src='/img/gallery.svg' alt='gallery' />
    //                     </span>
    //                   </div>
    //                 </td>
    //                 <td>
    //                   <div className='d-flex align-items-center'>
    //                     <span className='btn edit-icon pe-0'>
    //                       <svg
    //                         xmlns='http://www.w3.org/2000/svg'
    //                         width='16'
    //                         height='16'
    //                         fill='currentColor'
    //                         className='bi bi-pencil'
    //                         viewBox='0 0 16 16'
    //                       >
    //                         <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
    //                       </svg>
    //                     </span>
    //                     <span className='btn del-icon'>
    //                       <svg
    //                         xmlns='http://www.w3.org/2000/svg'
    //                         width='16'
    //                         height='16'
    //                         fill='currentColor'
    //                         className='bi bi-trash'
    //                         viewBox='0 0 16 16'
    //                       >
    //                         <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
    //                         <path
    //                           fill-rule='evenodd'
    //                           d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
    //                         />
    //                       </svg>
    //                     </span>
    //                   </div>
    //                 </td>
    //               </tr>
    //               <tr>
    //                 <th scope='row'>
    //                   <div className='d-flex align-items-center'>
    //                     <div className='doctor-img rounded-circle me-3'>
    //                       <img
    //                         src='../img/doc-profile.png'
    //                         className='img-fluid'
    //                       />
    //                     </div>
    //                     <div className='fw-normal'>Angelica</div>
    //                   </div>
    //                 </th>
    //                 <td>69/k, Panthopath, K.K. Bhaban</td>
    //                 <td>Cavities</td>
    //                 <td>24</td>
    //                 <td>+8801796636596</td>
    //                 <td>angelicaramos@example.com</td>
    //                 <td>
    //                   <div className='d-flex align-items-center'>
    //                     <span className='me-1'>
    //                       <img src='/img/gallery.svg' alt='gallery' />
    //                     </span>
    //                     <span className='me-1'>
    //                       <img src='/img/gallery.svg' alt='gallery' />
    //                     </span>
    //                     <span className='me-1'>
    //                       <img src='/img/gallery.svg' alt='gallery' />
    //                     </span>
    //                   </div>
    //                 </td>
    //                 <td>
    //                   <div className='d-flex align-items-center'>
    //                     <span className='btn edit-icon pe-0'>
    //                       <svg
    //                         xmlns='http://www.w3.org/2000/svg'
    //                         width='16'
    //                         height='16'
    //                         fill='currentColor'
    //                         className='bi bi-pencil'
    //                         viewBox='0 0 16 16'
    //                       >
    //                         <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
    //                       </svg>
    //                     </span>
    //                     <span className='btn del-icon'>
    //                       <svg
    //                         xmlns='http://www.w3.org/2000/svg'
    //                         width='16'
    //                         height='16'
    //                         fill='currentColor'
    //                         className='bi bi-trash'
    //                         viewBox='0 0 16 16'
    //                       >
    //                         <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
    //                         <path
    //                           fill-rule='evenodd'
    //                           d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
    //                         />
    //                       </svg>
    //                     </span>
    //                   </div>
    //                 </td>
    //               </tr>
    //               <tr>
    //                 <th scope='row'>
    //                   <div className='d-flex align-items-center'>
    //                     <div className='doctor-img rounded-circle me-3'>
    //                       <img
    //                         src='../img/doc-profile.png'
    //                         className='img-fluid'
    //                       />
    //                     </div>
    //                     <div className='fw-normal'>Angelica</div>
    //                   </div>
    //                 </th>
    //                 <td>69/k, Panthopath, K.K. Bhaban</td>
    //                 <td>Cavities</td>
    //                 <td>24</td>
    //                 <td>+8801796636596</td>
    //                 <td>angelicaramos@example.com</td>
    //                 <td>
    //                   <div className='d-flex align-items-center'>
    //                     <span className='me-1'>
    //                       <img src='/img/gallery.svg' alt='gallery' />
    //                     </span>
    //                     <span className='me-1'>
    //                       <img src='/img/gallery.svg' alt='gallery' />
    //                     </span>
    //                     <span className='me-1'>
    //                       <img src='/img/gallery.svg' alt='gallery' />
    //                     </span>
    //                   </div>
    //                 </td>
    //                 <td>
    //                   <div className='d-flex align-items-center'>
    //                     <span className='btn edit-icon pe-0'>
    //                       <svg
    //                         xmlns='http://www.w3.org/2000/svg'
    //                         width='16'
    //                         height='16'
    //                         fill='currentColor'
    //                         className='bi bi-pencil'
    //                         viewBox='0 0 16 16'
    //                       >
    //                         <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
    //                       </svg>
    //                     </span>
    //                     <span className='btn del-icon'>
    //                       <svg
    //                         xmlns='http://www.w3.org/2000/svg'
    //                         width='16'
    //                         height='16'
    //                         fill='currentColor'
    //                         className='bi bi-trash'
    //                         viewBox='0 0 16 16'
    //                       >
    //                         <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
    //                         <path
    //                           fill-rule='evenodd'
    //                           d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
    //                         />
    //                       </svg>
    //                     </span>
    //                   </div>
    //                 </td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>
    //         <div className='row'>
    //           <nav aria-label='Page navigation example'>
    //             <ul className='pagination justify-content-end my-2'>
    //               <li className='page-item'>
    //                 <a className='page-link ' href='#' aria-label='Previous'>
    //                   <span aria-hidden='true'>
    //                     <svg
    //                       xmlns='http://www.w3.org/2000/svg'
    //                       width='18'
    //                       height='18'
    //                       viewBox='0 0 24 24'
    //                       fill='none'
    //                       stroke='currentColor'
    //                       stroke-width='2'
    //                       stroke-linecap='round'
    //                       stroke-linejoin='round'
    //                       className='feather feather-chevron-left'
    //                     >
    //                       <polyline points='15 18 9 12 15 6'></polyline>
    //                     </svg>
    //                   </span>
    //                 </a>
    //               </li>
    //               <li className='page-item  active'>
    //                 <a className='page-link' href='#'>
    //                   1
    //                 </a>
    //               </li>
    //               <li className='page-item'>
    //                 <a className='page-link' href='#'>
    //                   2
    //                 </a>
    //               </li>
    //               <li className='page-item'>
    //                 <a className='page-link' href='#'>
    //                   3
    //                 </a>
    //               </li>
    //               <li className='page-item'>
    //                 <a className='page-link' href='#' aria-label='Next'>
    //                   <span aria-hidden='true'>
    //                     <svg
    //                       xmlns='http://www.w3.org/2000/svg'
    //                       width='18'
    //                       height='18'
    //                       viewBox='0 0 24 24'
    //                       fill='none'
    //                       stroke='currentColor'
    //                       stroke-width='2'
    //                       stroke-linecap='round'
    //                       stroke-linejoin='round'
    //                       className='feather feather-chevron-right'
    //                     >
    //                       <polyline points='9 18 15 12 9 6'></polyline>
    //                     </svg>
    //                   </span>
    //                 </a>
    //               </li>
    //             </ul>
    //           </nav>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
