const UiPaths = {
  Dashboard: '/dashboard',
  Clinics: '/clinics',
  ClinicDetails: '/clinic-details',
  ClinicUserProfile: '/clinic-user-profile',
  Diagnostics: '/diagnostics',
  Finance: '/finance',
  Investigations: '/investigations',
  Invoices: '/invoices',
  AddInvoice: () => `${UiPaths.Invoices}/add`,
  Patients: '/patients',
  PatientReports: '/patient-reports',
  SmsManagement: '/sms-management',
  Companies: '/companies',
  CompanyUsers: '/company-users',
  Login: '/login',
  ForgetPassword: '/forget-password',
  ResetPassword: '/reset-password',
  Profile: '/profile',
  NotFound: '/notFound',
};

export default UiPaths;
