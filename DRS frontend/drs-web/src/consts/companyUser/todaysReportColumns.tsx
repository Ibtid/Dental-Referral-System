import { TableColumn } from 'react-data-table-component';
import { ITodaysReport } from '../../interfaces/controllers/companyUser';

export const getTodaysReportColumns = () => {
  const columns: TableColumn<ITodaysReport>[] = [
    {
      name: 'Patient Name',
      selector: (row) => row.patient.name,
    },
    {
      name: 'Gender',
      selector: (row) => row.patient.gender,
    },
    {
      name: 'Delivery Time',
      selector: (row) =>
        new Date(row.deliveryTime).toLocaleString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
    },
    {
      name: 'Details',
      cell: (row) => <button>Details</button>,
    },
  ];
  return columns;
};
