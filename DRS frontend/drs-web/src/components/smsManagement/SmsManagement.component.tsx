import { FC, Fragment, useState } from 'react';
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import { getColumns, smsTableOptionsConfig } from '../../consts/sms';
import { useGetSms } from '../../controllers/sms';
import { ISms } from '../../interfaces/controllers/sms';
import CommonDataTable from '../common/CommonDataTable.component';

export const SmsManagement: FC = () => {
  const [pageNo, setPageNo] = useState<number>(initialPageNo);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchData, setSearchData] = useState<string>('');

  const { sms, isLoading } = useGetSms({
    pageNo: pageNo,
    pageSize: pageSize,
    searchData,
  });

  const columns = getColumns();

  return (
    <Fragment>
      <CommonDataTable<ISms>
        columns={columns}
        data={sms?.body.data}
        totalCount={sms?.body.totalCount}
        progressPending={isLoading}
        tableTitle='Sms Management'
        pageNo={pageNo}
        setPageNo={setPageNo}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setSearchData={setSearchData}
        tableOptionsConfig={smsTableOptionsConfig}
      />
    </Fragment>
    // <div className='container-fluid'>
    //   <div className='row'>
    //     <div className='col-12 '>
    //       <div className='patients-survey d-flex flex-column p-3'>
    //         <p className='title d-flex pb-3 '>SMS Management</p>

    //         <div className='table-responsive pt-3'>
    //           <table className='appointment-table table '>
    //             <thead className=' table-header '>
    //               <tr>
    //                 <th className='table-title py-3' scope='col'>
    //                   Name
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Text
    //                 </th>
    //                 <th className='table-title py-3' scope='col'>
    //                   Date
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               <tr>
    //                 <td scope='row'>Bruce Wane</td>
    //                 <td className='table-text-ellipsis'>
    //                   শুভেচ্ছা। আপনার পরবর্তী সাক্ষাতকার ১১ মে। সিরিয়ালের জন্য
    //                   ফোন করুন 09613-787809 নম্বরে Dr. Ashraf Ur Rahman (T...
    //                 </td>
    //                 <td>08:00 am</td>
    //               </tr>
    //               <tr>
    //                 <td scope='row'>Bruce Wane</td>
    //                 <td className='table-text-ellipsis'>
    //                   শুভেচ্ছা। আপনার পরবর্তী সাক্ষাতকার ১১ মে। সিরিয়ালের জন্য
    //                   ফোন করুন 09613-787809 নম্বরে Dr. Ashraf Ur Rahman (T...
    //                 </td>
    //                 <td>08:00 am</td>
    //               </tr>
    //               <tr>
    //                 <td scope='row'>Bruce Wane</td>
    //                 <td className='table-text-ellipsis'>
    //                   শুভেচ্ছা। আপনার পরবর্তী সাক্ষাতকার ১১ মে। সিরিয়ালের জন্য
    //                   ফোন করুন 09613-787809 নম্বরে Dr. Ashraf Ur Rahman (T...
    //                 </td>
    //                 <td>08:00 am</td>
    //               </tr>
    //               <tr>
    //                 <td scope='row'>Bruce Wane</td>
    //                 <td className='table-text-ellipsis'>
    //                   শুভেচ্ছা। আপনার পরবর্তী সাক্ষাতকার ১১ মে। সিরিয়ালের জন্য
    //                   ফোন করুন 09613-787809 নম্বরে Dr. Ashraf Ur Rahman (T...
    //                 </td>
    //                 <td>08:00 am</td>
    //               </tr>
    //               <tr>
    //                 <td scope='row'>Bruce Wane</td>
    //                 <td className='table-text-ellipsis'>
    //                   শুভেচ্ছা। আপনার পরবর্তী সাক্ষাতকার ১১ মে। সিরিয়ালের জন্য
    //                   ফোন করুন 09613-787809 নম্বরে Dr. Ashraf Ur Rahman (T...
    //                 </td>
    //                 <td>08:00 am</td>
    //               </tr>
    //               <tr>
    //                 <td scope='row'>Bruce Wane</td>
    //                 <td className='table-text-ellipsis'>
    //                   শুভেচ্ছা। আপনার পরবর্তী সাক্ষাতকার ১১ মে। সিরিয়ালের জন্য
    //                   ফোন করুন 09613-787809 নম্বরে Dr. Ashraf Ur Rahman (T...
    //                 </td>
    //                 <td>08:00 am</td>
    //               </tr>
    //               <tr>
    //                 <td scope='row'>Bruce Wane</td>
    //                 <td className='table-text-ellipsis'>
    //                   শুভেচ্ছা। আপনার পরবর্তী সাক্ষাতকার ১১ মে। সিরিয়ালের জন্য
    //                   ফোন করুন 09613-787809 নম্বরে Dr. Ashraf Ur Rahman (T...
    //                 </td>
    //                 <td>08:00 am</td>
    //               </tr>
    //               <tr>
    //                 <td scope='row'>Bruce Wane</td>
    //                 <td className='table-text-ellipsis'>
    //                   শুভেচ্ছা। আপনার পরবর্তী সাক্ষাতকার ১১ মে। সিরিয়ালের জন্য
    //                   ফোন করুন 09613-787809 নম্বরে Dr. Ashraf Ur Rahman (T...
    //                 </td>
    //                 <td>08:00 am</td>
    //               </tr>
    //               <tr>
    //                 <td scope='row'>Bruce Wane</td>
    //                 <td className='table-text-ellipsis'>
    //                   শুভেচ্ছা। আপনার পরবর্তী সাক্ষাতকার ১১ মে। সিরিয়ালের জন্য
    //                   ফোন করুন 09613-787809 নম্বরে Dr. Ashraf Ur Rahman (T...
    //                 </td>
    //                 <td>08:00 am</td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
