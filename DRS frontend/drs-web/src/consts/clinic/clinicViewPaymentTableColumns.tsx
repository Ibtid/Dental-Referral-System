import { TableColumn } from 'react-data-table-component';
import { IClinicPaymentTableData } from '../../interfaces/controllers/clinic';

export const clinicViewPaymentTableColumns: TableColumn<IClinicPaymentTableData>[] =
  [
    {
      name: 'Message',
      selector: (row) => row.message,
    },
    {
      name: 'Date',
      selector: (row) =>
        new Date(row.timeStamp).toLocaleString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
    },
  ];
