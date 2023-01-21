import { FC, Fragment } from 'react';
import { PatientList } from '../components/patients';

const PatientsPage: FC = () => {
  return (
    <Fragment>
      <PatientList />
    </Fragment>
  );
};

export default PatientsPage;
