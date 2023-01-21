import { TableColumn } from 'react-data-table-component';
import { IClinicPatientTableData } from '../../interfaces/controllers/clinic';

export const clinicViewPatientTableColumns: TableColumn<IClinicPatientTableData>[] =
  [
    {
      name: 'Name',
      selector: (row) => row.patient.name,
    },

    {
      name: 'Contact',
      selector: (row) => row.patient.contactNumber,
    },
    {
      name: 'Investigations',
      cell: (row) =>
        row.invoiceInvestigation.map((investigation, index) => {
          return (
            <span key={index}>
              {investigation.investigation.name}
              {row.invoiceInvestigation.length === index + 1 ? '' : ',  '}
            </span>
          );
        }),
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
  ];
