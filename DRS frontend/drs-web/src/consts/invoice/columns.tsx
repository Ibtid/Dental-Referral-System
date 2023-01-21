import { TableColumn } from 'react-data-table-component';
import { IGetColumnsProps } from '../../interfaces/components/invoice';
import { IManageInvoice } from '../../interfaces/controllers/invoice';
import { useNavigate } from 'react-router-dom';
import UiPaths from '../../paths/uiPaths';

export const getColumns = ({
  selectedInvestigationId,
  selectedInvoiceId,
  setselectedInvestigationId,
  setselectedInvoiceId,
  isLoadingInvoiceDownload,
  isLoadingInvoicePrint,
}: IGetColumnsProps) => {
  const navigate = useNavigate();
  const columns: TableColumn<IManageInvoice>[] = [
    {
      name: 'Report ID',
      selector: (row) => row.reportId,
    },
    {
      name: 'Name',
      selector: (row) => row.patient.name,
    },
    {
      name: 'Address',
      selector: (row) => row.patient.address,
    },
    {
      name: 'Mobile',
      selector: (row) => row.mobileNumber,
    },
    {
      name: 'Age',
      selector: (row) => row.patient.age,
    },
    {
      name: 'Clinic',
      selector: (row) => (row.clinic ? row.clinic.name : '-/-'),
    },
    {
      name: 'Entry Date',
      selector: (row) =>
        new Date(row.createdDate).toLocaleString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
    },
    {
      name: 'Report',
      cell: (row) => (
        <div>
          {row.invoiceInvestigation.map((invoiceInvestigation) => (
            <button
              className='btn btn-link p-0'
              onClick={() => {
                setselectedInvestigationId(invoiceInvestigation.id);
              }}>
              {isLoadingInvoiceDownload &&
              selectedInvestigationId === invoiceInvestigation.id ? (
                <div className='spinner-border text-primary' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              ) : (
                <img src='./img/gallery.svg' alt='gallery' />
              )}
            </button>
          ))}
        </div>
      ),
    },
    {
      name: '',
      cell: (row) => (
        <div>
          {isLoadingInvoicePrint && selectedInvoiceId === row.id ? (
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          ) : (
            <img
              src='./img/print.svg'
              alt='print'
              onClick={() => {
                setselectedInvoiceId(row.id);
              }}
            />
          )}
        </div>
      ),
    },
    {
      name: '',
      cell: (row) => (
        <button
          onClick={() => {
            navigate(`${UiPaths.Invoices}/${row.id}`);
          }}>
          View
        </button>
      ),
    },
  ];

  return columns;
};
