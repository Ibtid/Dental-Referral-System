import { FC, Fragment, useState } from 'react';
import { financeTableOptionsConfig } from '../../consts/finance';
import { getColumns } from '../../consts/finance';
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import { useGetFinanceTableData } from '../../controllers/invoice';
import { IFinance } from '../../interfaces/controllers/finance';
import { UpdateFinanceModal } from '../../modals/finance';
import CommonDataTable from '../common/CommonDataTable.component';

export const Finance: FC = () => {
  const [pageNo, setPageNo] = useState<number>(initialPageNo);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchData, setSearchData] = useState<string>('');

  const { finances, isLoading } = useGetFinanceTableData({
    pageNo: pageNo,
    pageSize: pageSize,
    searchData,
  });

  const [selectedFinanceId, setselectedFinanceId] = useState<number>();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const columns = getColumns({ setselectedFinanceId, setShowUpdateModal });

  return (
    <Fragment>
      <CommonDataTable<IFinance>
        columns={columns}
        data={finances?.body.data}
        totalCount={finances?.body.totalCount}
        progressPending={isLoading}
        tableTitle='Finance'
        pageNo={pageNo}
        setPageNo={setPageNo}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setSearchData={setSearchData}
        tableOptionsConfig={financeTableOptionsConfig}
      />
      {showUpdateModal && (
        <UpdateFinanceModal
          pageNo={pageNo}
          pageSize={pageSize}
          selectedFinanceId={selectedFinanceId!}
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}
    </Fragment>
    // <div className='container-fluid'>
    //   <div className='row mb-4'>
    //     <div className='col-12 '>
    //       <div className='patients-survey d-flex flex-column p-3'>
    //         <p className='title pb-3 mb-0'>Finance</p>
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
    //                           aria-expanded='false'>
    //                           10
    //                         </a>

    //                         <ul
    //                           className='dropdown-menu '
    //                           aria-labelledby='dropdownMenuLink'>
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
    //                       aria-expanded='false'>
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
    //                     {/* <!-- <input className="form-control" type="text" placeholder="Search Patient" aria-label="Search"> --> */}
    //                     <ul
    //                       className='dropdown-menu px-3 w-100'
    //                       aria-labelledby='dropdownsearchitems'>
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
    //             <thead className='table-header '>
    //               <tr>
    //                 <th className='table-title py-3' scope='col'>
    //                   Bill No.{' '}
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Bill date
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Patient
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Clinic
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Charges
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Tax
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Discount
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Total
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Status
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Action
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               <tr>
    //                 <th scope='row'>1</th>
    //                 <td>11/19/2018</td>
    //                 <td>Virginia Rose</td>
    //                 <td>Law</td>
    //                 <td>721</td>
    //                 <td>72</td>
    //                 <td>36</td>
    //                 <td>757</td>
    //                 <td>
    //                   <span className='badge bg-success btn'>Paid</span>
    //                 </td>
    //                 <td></td>
    //               </tr>
    //               <tr>
    //                 <th scope='row'>1</th>
    //                 <td>11/19/2018</td>
    //                 <td>Virginia Rose</td>
    //                 <td>Law</td>
    //                 <td>721</td>
    //                 <td>72</td>
    //                 <td>36</td>
    //                 <td>757</td>
    //                 <td>
    //                   <span className='badge bg-danger btn'>Due</span>
    //                 </td>
    //                 <td>
    //                   <span className='badge cta-outline btn p-2'>
    //                     Mark as Paid
    //                   </span>
    //                 </td>
    //               </tr>
    //               <tr>
    //                 <th scope='row'>1</th>
    //                 <td>11/19/2018</td>
    //                 <td>Virginia Rose</td>
    //                 <td>Law</td>
    //                 <td>721</td>
    //                 <td>72</td>
    //                 <td>36</td>
    //                 <td>757</td>
    //                 <td>
    //                   <span className='badge bg-success btn'>Paid</span>
    //                 </td>
    //                 <td></td>
    //               </tr>
    //               <tr>
    //                 <th scope='row'>1</th>
    //                 <td>11/19/2018</td>
    //                 <td>Virginia Rose</td>
    //                 <td>Law</td>
    //                 <td>721</td>
    //                 <td>72</td>
    //                 <td>36</td>
    //                 <td>757</td>
    //                 <td>
    //                   <span className='badge bg-success btn'>Paid</span>
    //                 </td>
    //                 <td></td>
    //               </tr>
    //               <tr>
    //                 <th scope='row'>1</th>
    //                 <td>11/19/2018</td>
    //                 <td>Virginia Rose</td>
    //                 <td>Law</td>
    //                 <td>721</td>
    //                 <td>72</td>
    //                 <td>36</td>
    //                 <td>757</td>
    //                 <td>
    //                   <span className='badge bg-danger btn'>Due</span>
    //                 </td>
    //                 <td>
    //                   <span className='badge cta-outline btn p-2'>
    //                     Mark as Paid
    //                   </span>
    //                 </td>
    //               </tr>
    //               <tr>
    //                 <th scope='row'>1</th>
    //                 <td>11/19/2018</td>
    //                 <td>Virginia Rose</td>
    //                 <td>Law</td>
    //                 <td>721</td>
    //                 <td>72</td>
    //                 <td>36</td>
    //                 <td>757</td>
    //                 <td>
    //                   <span className='badge bg-success btn'>Paid</span>
    //                 </td>
    //                 <td></td>
    //               </tr>
    //               <tr>
    //                 <th scope='row'>1</th>
    //                 <td>11/19/2018</td>
    //                 <td>Virginia Rose</td>
    //                 <td>Law</td>
    //                 <td>721</td>
    //                 <td>72</td>
    //                 <td>36</td>
    //                 <td>757</td>
    //                 <td>
    //                   <span className='badge bg-success btn'>Paid</span>
    //                 </td>
    //                 <td></td>
    //               </tr>
    //               <tr>
    //                 <th scope='row'>1</th>
    //                 <td>11/19/2018</td>
    //                 <td>Virginia Rose</td>
    //                 <td>Law</td>
    //                 <td>721</td>
    //                 <td>72</td>
    //                 <td>36</td>
    //                 <td>757</td>
    //                 <td>
    //                   <span className='badge bg-success btn'>Paid</span>
    //                 </td>
    //                 <td></td>
    //               </tr>
    //               <tr>
    //                 <th scope='row'>1</th>
    //                 <td>11/19/2018</td>
    //                 <td>Virginia Rose</td>
    //                 <td>Law</td>
    //                 <td>721</td>
    //                 <td>72</td>
    //                 <td>36</td>
    //                 <td>757</td>
    //                 <td>
    //                   <span className='badge bg-danger btn'>Due</span>
    //                 </td>
    //                 <td>
    //                   <span className='badge cta-outline btn p-2'>
    //                     Mark as Paid
    //                   </span>
    //                 </td>
    //               </tr>
    //               <tr>
    //                 <th scope='row'>1</th>
    //                 <td>11/19/2018</td>
    //                 <td>Virginia Rose</td>
    //                 <td>Law</td>
    //                 <td>721</td>
    //                 <td>72</td>
    //                 <td>36</td>
    //                 <td>757</td>
    //                 <td>
    //                   <span className='badge bg-danger btn'>Due</span>
    //                 </td>
    //                 <td>
    //                   <span className='badge cta-outline btn p-2'>
    //                     Mark as Paid
    //                   </span>
    //                 </td>
    //               </tr>
    //               <tr>
    //                 <th scope='row'>1</th>
    //                 <td>11/19/2018</td>
    //                 <td>Virginia Rose</td>
    //                 <td>Law</td>
    //                 <td>721</td>
    //                 <td>72</td>
    //                 <td>36</td>
    //                 <td>757</td>
    //                 <td>
    //                   <span className='badge bg-success btn'>Paid</span>
    //                 </td>
    //                 <td></td>
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
    //                       className='feather feather-chevron-left'>
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
    //                       className='feather feather-chevron-right'>
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
