import { FC, useState } from 'react';
import { useInvoiceDownloadFile } from '../../controllers/invoice';
import { useDownloadPatientReport } from '../../controllers/patient/useDownloadPatientReport';
import { useGetPatientDetails } from '../../controllers/patient/useGetPatientDetails';
import { usePatientReportDownloadFile } from '../../controllers/patient/usePatientReportDownloadFile';
import { StoragePatientAuth } from '../../core/localStorage';

export const PatientReportList: FC = () => {
  const [selectedInvoiceInvestigationId, setSelectedInvoiceInvestigationId] =
    useState<number>();
  const { patientDetails } = useGetPatientDetails(
    StoragePatientAuth.reportId!,
    StoragePatientAuth.mobileNumber!
  );
  usePatientReportDownloadFile(
    selectedInvoiceInvestigationId!,
    setSelectedInvoiceInvestigationId
  );
  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col-12 '>
          <div className='patients-survey d-flex flex-column p-3'>
            <p className='title pb-3 mb-0'>Reports</p>

            <div className='pt-1 table-responsive'>
              <table className='appointment-table table table-striped'>
                <thead className='table-header'>
                  <tr>
                    <th className='table-title py-3' scope='col'>
                      Investigation name
                    </th>
                    <th className='table-title py-3' scope='col'>
                      Download Report
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patientDetails?.body.invoiceInvestigation.map((inv, _i) => (
                    <tr key={_i}>
                      <td>{inv.investigation.name}</td>
                      <td>
                        {inv.reportUploaded === true ? (
                          <p
                            className='btn btn-success'
                            onClick={() =>
                              setSelectedInvoiceInvestigationId(inv.id)
                            }
                          >
                            Download
                          </p>
                        ) : (
                          <p>No Report Uploaded</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
