import { FC, Fragment, useState } from 'react';
import {
  Cards,
  ClinicLineChart,
  PatientList,
  Payment,
  Tab,
} from '../components/clinics';

const ClinicDetailsPage: FC = () => {
  const [tabNavigation, setTabNavigation] = useState<string>('patient');
  return (
    <Fragment>
      <Cards />
      <Tab setTabNavigation={setTabNavigation} />
      {tabNavigation === 'patient' && <PatientList />}
      {tabNavigation === 'payment' && <Payment />}
      {tabNavigation === 'lineChart' && <ClinicLineChart />}
    </Fragment>
  );
};

export default ClinicDetailsPage;
