import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  AuthLayout,
  DRSLayout,
  PatientLayout,
  ClinicLayout,
} from '../components/layout';
import { AppUsers } from '../consts/auth';
import { useAuthContext } from '../core/contexts/auth';
import {
  ForgetPasswordPage,
  LoginPage,
  ResetPasswordPage,
} from '../pages/auth';
import UiPaths from '../paths/uiPaths';
import Private from './helpers/Private';

const DashboardPage = lazy(() => import('../pages/Dashboard'));
const ClinicsPage = lazy(() => import('../pages/Clinics'));
const SingleClinicDetailsPage = lazy(
  () => import('../pages/SingleClinicDetails')
);
const ClinicDetailsPage = lazy(() => import('../pages/ClinicDetails'));
const DiagnosticsPage = lazy(() => import('../pages/Diagnostics'));
const FinancePage = lazy(() => import('../pages/Finance'));
const InvestigationsPage = lazy(() => import('../pages/Investigations'));
const InvoicesPage = lazy(() => import('../pages/Invoices'));
const InvoiceDetailsPage = lazy(() => import('../pages/InvoiceDetails'));
const AddInvoicePage = lazy(() => import('../pages/AddInvoice'));
const PatientsPage = lazy(() => import('../pages/Patients'));
const PatientReportsPage = lazy(() => import('../pages/PatientReports'));
const SmsManagementPage = lazy(() => import('../pages/SmsManagement'));
const CompaniesPage = lazy(() => import('../pages/Companies'));
const CompanyDetailsPage = lazy(() => import('../pages/CompanyDetails'));
const CompanyUsersPage = lazy(() => import('../pages/CompanyUsers'));
const ProfilePage = lazy(() => import('../pages/Profile'));
const ClinicProfilePage = lazy(() => import('../pages/ClinicProfile'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => {
  const { userRole } = useAuthContext();

  const { CompanyAdmin, CompanyOperator, SuperAdmin, ClinicUser } = AppUsers;

  return (
    <Routes>
      <Route
        index
        element={
          <Navigate
            to={
              userRole.includes(SuperAdmin)
                ? UiPaths.Companies
                : UiPaths.Dashboard
            }
          />
        }
      />

      <Route element={<AuthLayout />}>
        <Route path={UiPaths.Login} element={<LoginPage />} />
        <Route path={UiPaths.ForgetPassword} element={<ForgetPasswordPage />} />
        <Route path={UiPaths.ResetPassword} element={<ResetPasswordPage />} />
      </Route>

      <Route element={<DRSLayout />}>
        <Route
          element={
            <Private
              allowedRoles={[SuperAdmin, CompanyOperator, CompanyAdmin]}
            />
          }>
          <Route path={UiPaths.Profile} element={<ProfilePage />} />
        </Route>

        <Route element={<Private allowedRoles={[SuperAdmin]} />}>
          <Route path={UiPaths.Companies} element={<CompaniesPage />} />
          <Route
            path={`${UiPaths.Companies}/:companyId`}
            element={<CompanyDetailsPage />}
          />
        </Route>

        <Route
          element={<Private allowedRoles={[CompanyOperator, CompanyAdmin]} />}>
          <Route path={UiPaths.Dashboard} element={<DashboardPage />} />
          <Route path={UiPaths.Clinics} element={<ClinicsPage />} />
          <Route
            path={`${UiPaths.Clinics}/:clinicId`}
            element={<SingleClinicDetailsPage />}
          />
          <Route path={UiPaths.Diagnostics} element={<DiagnosticsPage />} />
          <Route path={UiPaths.Finance} element={<FinancePage />} />
          <Route
            path={UiPaths.Investigations}
            element={<InvestigationsPage />}
          />
          <Route path={UiPaths.Invoices} element={<InvoicesPage />} />
          <Route
            path={`${UiPaths.Invoices}/:invoiceId`}
            element={<InvoiceDetailsPage />}
          />
          <Route path={UiPaths.AddInvoice()} element={<AddInvoicePage />} />
          <Route path={UiPaths.Patients} element={<PatientsPage />} />
          <Route path={UiPaths.SmsManagement} element={<SmsManagementPage />} />
        </Route>
        <Route element={<Private allowedRoles={[CompanyAdmin]} />}>
          <Route path={UiPaths.CompanyUsers} element={<CompanyUsersPage />} />
        </Route>
      </Route>

      <Route element={<ClinicLayout />}>
        <Route element={<Private allowedRoles={[ClinicUser]} />}>
          <Route
            path={UiPaths.ClinicUserProfile}
            element={<ClinicProfilePage />}
          />
          <Route path={UiPaths.ClinicDetails} element={<ClinicDetailsPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Route>

      <Route element={<PatientLayout />}>
        <Route path={UiPaths.PatientReports} element={<PatientReportsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
