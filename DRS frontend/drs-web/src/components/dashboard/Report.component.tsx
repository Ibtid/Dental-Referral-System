import { FC, useState } from 'react';
import {
  getTodaysReportColumns,
  todaysReportTableOptionsConfig,
} from '../../consts/companyUser';
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import {
  useIncomeReport,
  usePatientReport,
  useTodaysReport,
} from '../../controllers/companyUser';
import { ITodaysReport } from '../../interfaces/controllers/companyUser';
import CommonDataTable from '../common/CommonDataTable.component';

export const Report: FC = () => {
  const [pageNo, setPageNo] = useState<number>(initialPageNo);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchData, setSearchData] = useState<string>('');

  const { todaysReport, isLoading } = useTodaysReport({
    pageNo,
    pageSize,
    searchData,
  });
  const { patientReport } = usePatientReport();
  const { incomeReport } = useIncomeReport();

  const columns = getTodaysReportColumns();

  return (
    <div>
      <div className='row mb-4'>
        <div className='col-8'>
          <CommonDataTable<ITodaysReport>
            columns={columns}
            data={todaysReport?.body.data}
            totalCount={todaysReport?.body.totalCount}
            progressPending={isLoading}
            tableTitle="Today's Report"
            pageNo={pageNo}
            setPageNo={setPageNo}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setSearchData={setSearchData}
            tableOptionsConfig={todaysReportTableOptionsConfig}
          />
        </div>
        <div className='col-4'>
          <div>
            <div className='patients-survey  mb-4 p-3 '>
              <div className='patients-survey-graph '>
                <b>Patient Report</b>
                <div className='row'>
                  <div className='col'>
                    <p>Today</p>
                    <p>{patientReport?.body.dailyReport}</p>
                  </div>
                  <div className='col'>
                    <p>This Week</p>
                    <p>{patientReport?.body.weeklyReport}</p>
                  </div>
                  <div className='col'>
                    <p>This Month</p>
                    <p>{patientReport?.body.monthlyReport}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='patients-survey mb-4 p-3'>
              <div className='patients-survey-graph'>
                <b>Income Report</b>
                <div className='row'>
                  <div className='col'>
                    <p>Today</p>
                    <p>{incomeReport?.body.dailyIncome}</p>
                  </div>
                  <div className='col'>
                    <p>This Week</p>
                    <p>{incomeReport?.body.weeklyIncome}</p>
                  </div>
                  <div className='col'>
                    <p>This Month</p>
                    <p>{incomeReport?.body.monthlyIncome}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
