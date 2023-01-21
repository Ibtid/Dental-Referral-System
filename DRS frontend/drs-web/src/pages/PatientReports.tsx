import { FC, Fragment } from 'react';
import {
  PatientDetails,
  PatientReportList,
} from '../components/patientReports';
import { useGetPatientDetails } from '../controllers/patient/useGetPatientDetails';
import { StoragePatientAuth } from '../core/localStorage';

const PatientReportsPage: FC = () => {
  const { patientDetails, isLoading } = useGetPatientDetails(
    StoragePatientAuth.reportId!,
    StoragePatientAuth.mobileNumber!
  );

  if (isLoading) return <div>Loading...</div>;

  if (patientDetails?.body === null) {
    return (
      <div className='container-fluid'>
        Not valid Report Id or Phone Number!
      </div>
    );
  }

  return (
    <Fragment>
      <PatientDetails />
      <PatientReportList />
    </Fragment>
  );
};

export default PatientReportsPage;
