import { TableColumn } from 'react-data-table-component';
import { ISms } from '../../interfaces/controllers/sms';

export const getColumns = () => {
  const columns: TableColumn<ISms>[] = [
    {
      name: 'Clinic',
      selector: (row) => row.clinic.name,
    },
    {
      name: 'Phone',
      selector: (row) => row.receiverPhone,
    },
    {
      name: 'Type',
      selector: (row) => row.type,
    },
    {
      name: 'Text',
      selector: (row) => row.message,
    },
    {
      name: 'Date',
      selector: (row) =>
        new Date(row.createdDate).toLocaleString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
    },
    {
      name: 'Delivery Status',
      cell: (row) =>
        row.status === 'Sent' ? (
          <span className='badge bg-success btn'>Sent</span>
        ) : (
          <span className='badge bg-danger btn'>Failed</span>
        ),
    },
  ];
  return columns;
};
