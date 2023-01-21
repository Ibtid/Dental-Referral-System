import { FC, Fragment, useState } from 'react';
import { useGetPdf, useGetTests } from '../../controllers/test';
import CommonDataTable from '../common/CommonDataTable.component';
import { IExportDetails, ITableSortData } from '../../interfaces/common';
import initialSortData from '../../consts/initialSortData';
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import {
  initialTestFilterData,
  testFilterFields,
  testFilterValidationSchema,
} from '../../consts/test';
import { ITest, ITestFilterData } from '../../interfaces/controllers/test';
import columns from '../../consts/test/columns';
import { smsTableOptionsConfig } from '../../consts/sms';

const TestTable: FC = () => {
  const [pageNo, setPageNo] = useState<number>(initialPageNo);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchData, setSearchData] = useState<string>('');
  const [sortData, setSortData] = useState<ITableSortData>(initialSortData);
  const [filterData, setFilterData] = useState<ITestFilterData>(
    initialTestFilterData
  );

  const { tests, isLoading } = useGetTests({
    pageNo,
    pageSize,
    sortData,
    searchData,
    filterData,
  });

  const { refetchGetPdf } = useGetPdf();

  const testPdfExportDetails: IExportDetails = {
    contentType: 'application/pdf',
    downloadAs: 'Test Data',
    refetch: refetchGetPdf,
  };

  return (
    <Fragment>
      <CommonDataTable<ITest, ITestFilterData>
        columns={columns}
        data={tests?.body.data}
        totalCount={tests?.body.totalCount}
        progressPending={isLoading}
        tableTitle='Demo Title'
        pageNo={pageNo}
        setPageNo={setPageNo}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setSearchData={setSearchData}
        setSortData={setSortData}
        setFilterData={setFilterData}
        filterFields={testFilterFields}
        filterValidationSchema={testFilterValidationSchema}
        exportDetails={testPdfExportDetails}
        tableOptionsConfig={smsTableOptionsConfig}
      />
    </Fragment>
  );
};

export default TestTable;
