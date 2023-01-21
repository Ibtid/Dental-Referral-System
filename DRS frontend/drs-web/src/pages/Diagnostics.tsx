import { FC, Fragment } from 'react';
import { ManageDiagnostics, ReportTrackers } from '../components/diagnostics';

const DiagnosticsPage: FC = () => {
  return (
    <Fragment>
      <ManageDiagnostics />
      <ReportTrackers />
    </Fragment>
  );
};

export default DiagnosticsPage;
