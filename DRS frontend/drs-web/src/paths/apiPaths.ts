import { initialPageNo, initialPageSize } from '../consts/initialPageDetails';
import { IClinicTableQueryParams } from '../interfaces/controllers/clinic/clinicQueryParams.interface';
import { IFinanceTableQueryParams } from '../interfaces/controllers/finance';
import { IPatientTableQueryParams } from '../interfaces/controllers/patient';
import { ISmsTableQueryParams } from '../interfaces/controllers/sms';
import { ITestTableQueryParams } from '../interfaces/controllers/test';
import { IInvoiceTableQueryParams } from '../interfaces/controllers/invoice';
import { ICompanyTableQueryParams } from '../interfaces/controllers/company';
import { ICompanyUserTableQueryParams } from '../interfaces/controllers/companyUser';
import { IInvestigationTableQueryParams } from '../interfaces/controllers/investigations';
import { ILoginAsClinicVerifyPayload } from '../interfaces/controllers/auth';

const ApiPaths = {
  Home: '/home',
  Todo: {
    GetAll: '/todos',
    ById: (id: number) => `/todos/${id}`,
  },
  Photo: {
    GetAll: '/photos',
  },
  Auth: {
    Login: '/auth/login',
    Refresh: '/auth/refresh',
    Profile: '/auth/profile',
    Forget: '/auth/forgotPassword',
    Reset: '/auth/resetPassword',
    Change: '/auth/changePassword',
    Logout: '/auth/logout',
  },
  Company: {
    Root: () => '/company',
    GetAll: ({
      page = initialPageNo,
      limit = initialPageSize,
      search,
    }: ICompanyTableQueryParams) => {
      let path = `${ApiPaths.Company.Root()}?page=${page}&limit=${limit}`;
      if (search) {
        path = path.concat(`&search=${search}`);
      }
      return path;
    },
    ById: (id: number) => `${ApiPaths.Company.Root()}/${id}`,
  },
  User: {
    Root: () => '/user',
    ById: (id: number) => `${ApiPaths.User.Root()}/${id}`,
  },
  CompanyUser: {
    Root: () => '/companyUsers',
    GetAll: ({
      page = initialPageNo,
      limit = initialPageSize,
      search,
    }: ICompanyUserTableQueryParams) => {
      let path = `${ApiPaths.CompanyUser.Root()}?page=${page}&limit=${limit}`;
      if (search) {
        path = path.concat(`&search=${search}`);
      }
      return path;
    },
    ById: (id: number) => `${ApiPaths.CompanyUser.Root()}/${id}`,
    referralAppointments: () =>
      `${ApiPaths.CompanyUser.Root()}/referral-appointments`,
    inpersonAppointments: () =>
      `${ApiPaths.CompanyUser.Root()}/inperson-appointments`,
    appointmentReview: () =>
      `${ApiPaths.CompanyUser.Root()}/appointment-review`,
    patientSurvey: () => `${ApiPaths.CompanyUser.Root()}/patient-survey`,
    todaysReport: ({
      page = initialPageNo,
      limit = initialPageSize,
      search,
    }: IPatientTableQueryParams) => {
      let path = `${ApiPaths.CompanyUser.Root()}/todays-report?page=${page}&limit=${limit}`;
      if (search) {
        path = path.concat(`&search=${search}`);
      }
      return path;
    },
    patientReport: () => `${ApiPaths.CompanyUser.Root()}/patient-report`,
    incomeReport: () => `${ApiPaths.CompanyUser.Root()}/income-report`,
    accountsReport: () => `${ApiPaths.CompanyUser.Root()}/accounts-report`,
  },
  Patient: {
    Root: () => '/patient',
    GetAll: ({
      page = initialPageNo,
      limit = initialPageSize,
      search,
    }: IPatientTableQueryParams) => {
      let path = `${ApiPaths.Patient.Root()}?page=${page}&limit=${limit}`;
      if (search) {
        path = path.concat(`&search=${search}`);
      }
      return path;
    },
    ById: (id: number) => `${ApiPaths.Patient.Root()}/${id}`,
    LoginAsPatient: () => `${ApiPaths.Patient.Root()}/login`,
    DownloadReport: (id: number) =>
      `${ApiPaths.Patient.Root()}/report-download/${id}`,
    PatientView: (invoiceNumber: string, mobileNumber: string) => {
      return `${ApiPaths.Patient.Root()}/view?invoiceNumber=${invoiceNumber}&mobileNumber=${mobileNumber}`;
    },
  },
  Doctor: {
    Root: () => '/doctor',
    ById: (id: number) => `${ApiPaths.Doctor.Root()}/${id}`,
  },
  Clinic: {
    Root: () => '/clinic',
    GetAll: ({
      page = initialPageNo,
      limit = initialPageSize,
      search,
    }: IClinicTableQueryParams) => {
      let path = `${ApiPaths.Clinic.Root()}?page=${page}&limit=${limit}`;
      if (search) {
        path = path.concat(`&search=${search}`);
      }
      return path;
    },
    ById: (id: number) => `${ApiPaths.Clinic.Root()}/${id}`,
    Profile: 'clinic/profile',
    Login: () => `${ApiPaths.Clinic.Root()}/login`,
    Verify: ({ mobile, code }: ILoginAsClinicVerifyPayload) => {
      return `${ApiPaths.Clinic.Root()}/verify?mobile=${mobile}&code=${code}`;
    },
    CardsData: () => `${ApiPaths.Clinic.Root()}/cards/data`,
    LineData: () => `${ApiPaths.Clinic.Root()}/line/data`,
    PatientTableData: ({
      page = initialPageNo,
      limit = initialPageSize,
      search,
    }: IClinicTableQueryParams) => {
      let path = `${ApiPaths.Clinic.Root()}/table/patient?page=${page}&limit=${limit}`;
      if (search) {
        path = path.concat(`&search=${search}`);
      }
      return path;
    },
    PaymentTableData: ({
      page = initialPageNo,
      limit = initialPageSize,
      search,
    }: IClinicTableQueryParams) => {
      let path = `${ApiPaths.Clinic.Root()}/table/payment?page=${page}&limit=${limit}`;
      if (search) {
        path = path.concat(`&search=${search}`);
      }
      return path;
    },
  },
  Investigation: {
    Root: () => '/investigation',
    GetAll: ({
      page = initialPageNo,
      limit = initialPageSize,
      search,
    }: IInvestigationTableQueryParams) => {
      let path = `${ApiPaths.Investigation.Root()}?page=${page}&limit=${limit}`;
      if (search) {
        path = path.concat(`&search=${search}`);
      }
      return path;
    },
    ById: (id: number) => `${ApiPaths.Investigation.Root()}/${id}`,
  },
  Invoice: {
    Root: () => '/invoice',
    GetFinanceTableData: ({
      page = initialPageNo,
      limit = initialPageSize,
      search,
    }: IFinanceTableQueryParams) => {
      let path = `${ApiPaths.Invoice.Root()}/finances?page=${page}&limit=${limit}`;
      if (search) {
        path = path.concat(`&search=${search}`);
      }
      return path;
    },
    GetManageInvoiceData: ({
      page = initialPageNo,
      limit = initialPageSize,
      search,
    }: IInvoiceTableQueryParams) => {
      let path = `${ApiPaths.Invoice.Root()}?page=${page}&limit=${limit}`;
      if (search) {
        path = path.concat(`&search=${search}`);
      }
      return path;
    },
    Payment: (id: number) => `${ApiPaths.Invoice.Root()}/duepayment/${id}`,
    DownloadFile: (id: number) =>
      `${ApiPaths.Invoice.Root()}/download/file/${id}`,
    PrintInvoice: (id: number) => `${ApiPaths.Invoice.Root()}/print/${id}`,
    ById: (id: number) => `${ApiPaths.Invoice.Root()}/${id}`,
    UploadInvoiceInvestigation: (id: number) =>
      `${ApiPaths.Invoice.Root()}/upload/report/${id}`,
  },
  Sms: {
    Root: () => '/sms-log',
    GetAll: ({
      page = initialPageNo,
      limit = initialPageSize,
      search,
    }: ISmsTableQueryParams) => {
      let path = `${ApiPaths.Sms.Root()}?page=${page}&limit=${limit}`;
      if (search) {
        path = path.concat(`&search=${search}`);
      }
      return path;
    },
  },
  Test: {
    GetAll: ({
      page = initialPageNo,
      limit = initialPageSize,
      search,
      sortby,
      order,
      gender,
      status,
    }: ITestTableQueryParams) => {
      let path = `/test/index?page=${page}&limit=${limit}`;
      if (search) {
        path = path.concat(`&search=${search}`);
      }
      if (sortby && order) {
        path = path.concat(`&sortby=${sortby}&order=${order}`);
      }
      if (gender) {
        path = path.concat(`&gender=${gender}`);
      }
      if (status) {
        path = path.concat(`&status=${status}`);
      }
      return path;
    },
    GetPdf: `/test/pdf/generate`,
  },
};

export default ApiPaths;
