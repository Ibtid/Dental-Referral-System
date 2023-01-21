import { FC, Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PatientInfo, ReportUpload } from '../components/invoiceDetails/index';
import { useGetInvoiceById } from '../controllers/invoice';
import { qrCodeGenerator } from '../utils/base64ToBlob/qrCodeGenerator';

const InvoiceDetailsPage: FC = () => {
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const { invoiceDetails, isLoading } = useGetInvoiceById(parseInt(invoiceId!));
  const [qrCode, setQrCode] = useState<string>('');
  const getQrCode = async () => {
    const code = await qrCodeGenerator({
      patient: invoiceDetails?.body.patient.name,
      reportId: invoiceDetails?.body.reportId,
    });
    setQrCode(code);
  };
  useEffect(() => {
    getQrCode();
  }, [invoiceDetails]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 '>
            <div className='patients-survey d-flex flex-column p-3'>
              <p className='title pb-3 mb-3'>
                <span
                  onClick={() => navigate(-1)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src='/svg/arrow-back.svg'
                    alt='Back Icon'
                    height={30}
                    width={35}
                  />
                </span>{' '}
                Invoice Details
              </p>
              <div className='clinic-profile-container container-fluid'>
                <div className='row'>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-7 col-xl-9 col-xxl-10'>
                    <div className='row mb-4'>
                      <div className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2'>
                        <img src={qrCode} alt='qrCode' />
                      </div>
                    </div>
                    <PatientInfo {...invoiceDetails!?.body} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid mt-3'>
        <div className='row'>
          <div className='col-12 '>
            <div className='patients-survey d-flex flex-column p-3'>
              <big className='mb-3'>Reports</big>
              <div className='row mb-4 mt-2'>
                <div className='pt-1 table-responsive'>
                  <table className='appointment-table table table-striped'>
                    <thead className='table-header'>
                      <tr>
                        <th className='table-title py-3' scope='col'>
                          Investigation name
                        </th>
                        <th className='table-title py-3' scope='col'>
                          Cost
                        </th>
                        <th className='table-title py-3' scope='col'>
                          Report Status
                        </th>
                        <th className='table-title py-3' scope='col'>
                          Upload/Edit
                        </th>
                      </tr>
                    </thead>
                    {invoiceDetails?.body.invoiceInvestigation.map(
                      (oneInvoiceInvestigation) => (
                        <ReportUpload
                          id={oneInvoiceInvestigation.id}
                          reportUploaded={
                            oneInvoiceInvestigation.reportUploaded
                          }
                          name={oneInvoiceInvestigation.investigation.name}
                          cost={oneInvoiceInvestigation.investigation.cost}
                        />
                      )
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InvoiceDetailsPage;
