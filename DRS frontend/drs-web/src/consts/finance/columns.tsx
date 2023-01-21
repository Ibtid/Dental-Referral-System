import { TableColumn } from 'react-data-table-component';
import { usePatchFinance } from '../../controllers/invoice';
import { IGetColumnsProps } from '../../interfaces/components/finances';
import { IFinance } from '../../interfaces/controllers/finance';

export const getColumns = ({
  setselectedFinanceId,
  setShowUpdateModal,
}: IGetColumnsProps) => {
  const columns: TableColumn<IFinance>[] = [
    // {
    //   name: 'ID',
    //   selector: (row) => row.id,
    // },
    {
      name: 'Report ID',
      selector: (row) => row.reportId,
    },
    {
      name: 'Patient',
      selector: (row) => row.patient.name,
    },
    {
      name: 'Clinic',
      selector: (row) => (row.clinic ? row.clinic.name : '-/-'),
    },
    {
      name: 'Gross Total',
      selector: (row) => row.grossTotal,
    },
    {
      name: 'Discount',
      selector: (row) => row.discount,
    },
    {
      name: 'Total',
      selector: (row) => row.total,
    },
    {
      name: 'Paid',
      selector: (row) => row.paid,
    },
    {
      name: 'Due',
      selector: (row) => row.due,
    },
    {
      name: 'Status',
      cell: (row) =>
        row.due == 0 ? (
          <span className='badge bg-success btn'>Paid</span>
        ) : (
          <span className='badge bg-danger btn'>Due</span>
        ),
    },
    {
      name: '',
      cell: (row) =>
        row.due != 0 && (
          <span
            className='badge cta-outline btn p-2'
            onClick={() => {
              setselectedFinanceId(row.id);
              setShowUpdateModal(true);
            }}>
            Payment
          </span>
        ),
    },
  ];
  return columns;
};
