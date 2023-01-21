import { ChangeEvent, Fragment, PropsWithChildren } from 'react';
import DataTable, {
  SortOrder,
  TableColumn,
  TableStyles,
} from 'react-data-table-component';
import { ICommonDataTableParams } from '../../interfaces/common';
import ReactPaginate from 'react-paginate';
import SearchBar from './SearchBar.component';
import { initialPageNo } from '../../consts/initialPageDetails';
import { successToast } from '../../libs/toast';

const CommonDataTable = <
  TData extends object,
  TFilterData extends object = {}
>({
  columns,
  data,
  totalCount,
  progressPending,
  tableTitle,
  pageNo,
  setPageNo,
  pageSize,
  setPageSize,
  setSortData,
  tableOptionsConfig,
  handleRowClick,
  createButton,
  setSearchData,
  setFilterData,
  filterFields,
  filterValidationSchema,
  exportDetails,
}: PropsWithChildren<ICommonDataTableParams<TData, TFilterData>>) => {
  const {
    isCreateButton,
    isSearch,
    isFilter,
    isSort,
    isExtraOptions,
    enableRowClick,
  } = tableOptionsConfig;

  const pageCount = Math.ceil(totalCount! / pageSize);

  const handleChangePage = ({ selected }: { selected: number }) => {
    setPageNo(selected + 1);
  };

  const handleChangePageSize = (size: number) => {
    setPageSize(size);
    setPageNo(initialPageNo);
  };

  const handleSort = (
    selectedColumn: TableColumn<TData>,
    sortDirection: SortOrder
  ) => {
    if (setSortData && selectedColumn.sortField) {
      setSortData({
        sortby: selectedColumn.sortField,
        order: sortDirection,
      });
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSearchData?.(target.value);
  };

  const customStyles: TableStyles = {
    headRow: {
      style: {
        color: 'white',
        backgroundColor: '#009CF9',
      },
    },
    head: {
      style: {
        fontSize: '14px',
      },
    },
    noData: {
      style: {
        padding: '50px',
        border: '1px solid gray',
        borderRadius: '5px',
      },
    },
    // table: {
    //   style: {
    //     border: '1px solid red',
    //   },
    // },
  };

  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 '>
            <div className='patients-survey d-flex flex-column p-3'>
              <p className='title pb-3 mb-0'>{tableTitle}</p>
              <div className='py-3'>
                <div className='row'>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-4 mb-lg-0 mb-3'>
                    {isCreateButton && createButton}
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-8'>
                    <div className='row align-items-md-center justify-content-lg-between'>
                      <div className='col-xl-7 col-lg-5 col-md-5 col-12 text-lg-end mb-3 mb-sm-3 mb-md-0'>
                        <div className='table-counter d-inline-block me-3'>
                          <span>Show</span>{' '}
                          <span>
                            <div className='dropdown d-inline-block'>
                              <a
                                className='btn btn-outline-secondary dropdown-toggle rounded-pill px-3 py-1 mx-1'
                                href='#'
                                role='button'
                                id='dropdownMenuLink'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                              >
                                {pageSize}
                              </a>
                              <ul
                                className='dropdown-menu '
                                aria-labelledby='dropdownMenuLink'
                              >
                                <li>
                                  <a
                                    className='dropdown-item'
                                    href='#'
                                    onClick={() => {
                                      handleChangePageSize(10);
                                    }}
                                  >
                                    10
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='dropdown-item'
                                    href='#'
                                    onClick={() => {
                                      handleChangePageSize(20);
                                    }}
                                  >
                                    20
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='dropdown-item'
                                    href='#'
                                    onClick={() => {
                                      handleChangePageSize(30);
                                    }}
                                  >
                                    30
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='dropdown-item'
                                    href='#'
                                    onClick={() => {
                                      handleChangePageSize(40);
                                    }}
                                  >
                                    40
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='dropdown-item'
                                    href='#'
                                    onClick={() => {
                                      handleChangePageSize(50);
                                    }}
                                  >
                                    50
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </span>
                          <span>entries</span>
                        </div>
                      </div>
                      <div className='col-xl-5 col-lg-7 col-md-7 col-12 d-flex justify-content-lg-end'>
                        {isSearch && (
                          <div className='site-search dropdown'>
                            <form
                              id='dropdownsearchitems'
                              className='d-flex form-control dropdown-toggle search-block'
                              role='button'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'
                            >
                              <input
                                className='w-100 border-0 me-2'
                                type='text'
                                placeholder='Search'
                                aria-label='Search'
                                onChange={(
                                  e: ChangeEvent<HTMLInputElement>
                                ) => {
                                  setPageNo(1);
                                  handleSearch(e);
                                }}
                              />
                              <button className='btn p-0' type='submit'>
                                <img
                                  src='/img/search.svg'
                                  alt='Search'
                                  className='svg-icon'
                                />
                              </button>
                            </form>
                          </div>
                        )}{' '}
                        {isFilter && (
                          <div className='mx-2'>
                            <button
                              className='btn border'
                              type='button'
                              data-bs-toggle='collapse'
                              data-bs-target='#collapseOne'
                              aria-expanded='true'
                              aria-controls='collapseOne'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-funnel'
                                viewBox='0 0 16 16'
                              >
                                <path d='M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z' />
                              </svg>
                            </button>
                          </div>
                        )}
                        <div>
                          {isExtraOptions && (
                            <div className='dropdown'>
                              <button
                                className='btn border dropdown-toggle'
                                type='button'
                                id='dropdownMenuButton1'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                              ></button>
                              <ul
                                className='dropdown-menu'
                                aria-labelledby='dropdownMenuButton1'
                              >
                                <li>
                                  <div className='dropdown-item'>
                                    <a
                                      href='#'
                                      className='btn text-start p-0 w-100'
                                    >
                                      <svg
                                        aria-hidden='true'
                                        focusable='false'
                                        data-prefix='fas'
                                        data-icon='file-excel'
                                        className='svg-inline--fa fa-file-excel fa-w-12 me-2 text-success font-sz-16'
                                        role='img'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 384 512'
                                      >
                                        <path
                                          fill='currentColor'
                                          d='M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm60.1 106.5L224 336l60.1 93.5c5.1 8-.6 18.5-10.1 18.5h-34.9c-4.4 0-8.5-2.4-10.6-6.3C208.9 405.5 192 373 192 373c-6.4 14.8-10 20-36.6 68.8-2.1 3.9-6.1 6.3-10.5 6.3H110c-9.5 0-15.2-10.5-10.1-18.5l60.3-93.5-60.3-93.5c-5.2-8 .6-18.5 10.1-18.5h34.8c4.4 0 8.5 2.4 10.6 6.3 26.1 48.8 20 33.6 36.6 68.5 0 0 6.1-11.7 36.6-68.5 2.1-3.9 6.2-6.3 10.6-6.3H274c9.5-.1 15.2 10.4 10.1 18.4zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z'
                                        ></path>
                                      </svg>
                                      <span className='font-sz-14'>
                                        Export as Excel
                                      </span>
                                    </a>
                                  </div>
                                </li>
                                <li>
                                  <div className='dropdown-item'>
                                    <a
                                      href='#'
                                      className='btn text-start p-0 w-100'
                                    >
                                      <svg
                                        aria-hidden='true'
                                        focusable='false'
                                        data-prefix='fas'
                                        data-icon='file-pdf'
                                        className='svg-inline--fa fa-file-pdf fa-w-12 me-2 text-danger'
                                        role='img'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 384 512'
                                      >
                                        <path
                                          fill='currentColor'
                                          d='M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z'
                                        ></path>
                                      </svg>
                                      <span className='font-sz-14'>
                                        Export as PDF
                                      </span>
                                    </a>
                                  </div>
                                </li>
                                <li>
                                  <div className='dropdown-item'>
                                    <a
                                      href='#'
                                      className='btn text-start p-0 w-100'
                                    >
                                      <svg
                                        aria-hidden='true'
                                        focusable='false'
                                        data-prefix='fas'
                                        data-icon='file-pdf'
                                        className='svg-inline--fa fa-file-pdf fa-w-12 me-2 text-primary'
                                        role='img'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 384 512'
                                      >
                                        <path
                                          fill='currentColor'
                                          d='M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z'
                                        ></path>
                                      </svg>
                                      <span className='font-sz-14'>
                                        Export as CSV
                                      </span>
                                    </a>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {isFilter && (
                    <div className='col-12'>
                      <div
                        id='collapseOne'
                        className='accordion-collapse collapse'
                        aria-labelledby='headingOne'
                        data-bs-parent='#accordionExample'
                      >
                        <div className='card card-body my-3'>
                          <div className='accordion-body'>
                            <strong>
                              This is the first item's accordion body.
                            </strong>{' '}
                            It is shown by default, until the collapse plugin
                            adds the appropriate classes that we use to style
                            each element. These classes control the overall
                            appearance, as well as the showing and hiding via
                            CSS transitions. You can modify any of this with
                            custom CSS or overriding our default variables. It's
                            also worth noting that just about any HTML can go
                            within the <code>.accordion-body</code>, though the
                            transition does limit overflow.
                          </div>
                          <div className='row'>
                            <div className='col-12 text-end'>
                              <button type='button' className='btn btn-link'>
                                Reset
                              </button>
                              <button
                                type='submit'
                                className='btn btn-site-primary mx-2'
                              >
                                Filter
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='col-12'>
                    <div className='pt-1 table-responsive mt-3'>
                      <div className='appointment-table'>
                        <DataTable
                          columns={columns}
                          data={data!}
                          progressPending={progressPending}
                          noDataComponent='There have no Data!'
                          striped={true}
                          highlightOnHover={true}
                          pointerOnHover={enableRowClick}
                          onRowClicked={
                            enableRowClick ? handleRowClick : undefined
                          }
                          sortServer={true}
                          onSort={handleSort}
                          customStyles={customStyles}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 mt-4'>
                    <nav aria-label='Page navigation example'>
                      {!!pageCount && (
                        <ReactPaginate
                          pageCount={pageCount}
                          forcePage={pageNo - 1}
                          breakLabel='...'
                          previousLabel='<'
                          nextLabel='>'
                          onPageChange={handleChangePage}
                          className='pagination justify-content-end my-2'
                          pageClassName='page-item'
                          pageLinkClassName='page-link'
                          activeClassName='active'
                          breakClassName='page-item disabled'
                          breakLinkClassName='page-link'
                          previousClassName='page-item'
                          previousLinkClassName='page-link'
                          nextClassName='page-item'
                          nextLinkClassName='page-link'
                          disabledClassName='disabled'
                        />
                      )}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <SearchBar<TFilterData>
        tableOptionsConfig={tableOptionsConfig}
        setSearchData={setSearchData}
        setPageNo={setPageNo}
        setFilterData={setFilterData}
        filterFields={filterFields}
        filterValidationSchema={filterValidationSchema}
        exportDetails={exportDetails}
      /> */}
      {/* <DataTable
        columns={columns}
        data={data!}
        progressPending={progressPending}
        noDataComponent='There have no Data!'
        highlightOnHover={true}
        pointerOnHover={true}
        onRowClicked={() => successToast('Clicked')}
        sortServer={true}
        onSort={handleSort}
      /> */}

      {/* <select name='pageSize' id='pageSize' onChange={handleChangePageSize}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select> */}

      {/* {!!pageCount && (
        <ReactPaginate
          pageCount={pageCount}
          forcePage={pageNo - 1}
          breakLabel='...'
          previousLabel='<'
          nextLabel='>'
          onPageChange={handleChangePage}
          className='pagination justify-content-center'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          activeClassName='active'
          breakClassName='page-item disabled'
          breakLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          disabledClassName='disabled'
        />
      )} */}
    </Fragment>
  );
};

export default CommonDataTable;
