import { FC, useState } from 'react';
import {
  clinicViewPatientTableColumns,
  clinicViewPatientTableOptionsConfig,
} from '../../consts/clinic';
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import { useGetClinicPatientTable } from '../../controllers/clinic';
import { IClinicPatientTableData } from '../../interfaces/controllers/clinic';
import CommonDataTable from '../common/CommonDataTable.component';

export const PatientList: FC = () => {
  const [pageNo, setPageNo] = useState<number>(initialPageNo);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchData, setSearchData] = useState<string>('');

  const { clinicPatientTableData, isLoading } = useGetClinicPatientTable({
    pageNo: pageNo,
    pageSize: pageSize,
    searchData,
  });
  return (
    <CommonDataTable<IClinicPatientTableData>
      columns={clinicViewPatientTableColumns}
      data={clinicPatientTableData?.body.data}
      totalCount={clinicPatientTableData?.body.totalCount}
      progressPending={isLoading}
      tableTitle='Reffered Patient'
      pageNo={pageNo}
      setPageNo={setPageNo}
      pageSize={pageSize}
      setPageSize={setPageSize}
      setSearchData={setSearchData}
      tableOptionsConfig={clinicViewPatientTableOptionsConfig}
    />
  );
};
