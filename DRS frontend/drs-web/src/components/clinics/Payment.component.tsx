import { FC, useState } from 'react';
import {
  clinicViewPaymentTableColumns,
  clinicViewPaymentTableOptionsConfig,
} from '../../consts/clinic';
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import { useGetClinicPaymentTable } from '../../controllers/clinic';
import { IClinicPaymentTableData } from '../../interfaces/controllers/clinic';
import CommonDataTable from '../common/CommonDataTable.component';

export const Payment: FC = () => {
  const [pageNo, setPageNo] = useState<number>(initialPageNo);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchData, setSearchData] = useState<string>('');

  const { clinicPaymentTableData, isLoading } = useGetClinicPaymentTable({
    pageNo: pageNo,
    pageSize: pageSize,
    searchData,
  });
  return (
    <CommonDataTable<IClinicPaymentTableData>
      columns={clinicViewPaymentTableColumns}
      data={clinicPaymentTableData?.body.data}
      totalCount={clinicPaymentTableData?.body.totalCount}
      progressPending={isLoading}
      tableTitle='Payment'
      pageNo={pageNo}
      setPageNo={setPageNo}
      pageSize={pageSize}
      setPageSize={setPageSize}
      setSearchData={setSearchData}
      tableOptionsConfig={clinicViewPaymentTableOptionsConfig}
    />
  );
};
