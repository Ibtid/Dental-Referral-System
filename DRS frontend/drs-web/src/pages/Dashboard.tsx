import { FC, Fragment } from 'react';
import { Card, Chart, Report } from '../components/dashboard';

const DashboardPage: FC = () => {
  return (
    <Fragment>
      <Card />
      <Chart />
      <Report />
    </Fragment>
  );
};

export default DashboardPage;
