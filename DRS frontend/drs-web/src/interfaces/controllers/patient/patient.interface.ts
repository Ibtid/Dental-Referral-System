interface IInvoice {
  id: number;
  reportId: string;
  patientId: number;
  clinicId: any;
  companyId: number;
  discount: string;
  mobileNumber: string;
  deliveryTime: string;
  grossTotal: string;
  total: string;
  paid: string;
  due: string;
  paymentMethod: string;
  paymentDescription: string;
  firstVisit: any;
  createdDate: string;
  lastModifiedBy: number;
  lastModifiedDate: string;
  isDeleted: boolean;
}

interface IPatientName {
  name: string;
}
interface IInvoiceInvestigation {
  investigation: IPatientName;
  id: number;
  reportUploaded: boolean;
}
export interface IPatient {
  id: number;
  name: string;
  gender: string;
  address: string;
  contactNumber: string;
  email: string;
  age: number;
  createdDate: Date;
  lastModifiedBy: number;
  lastModifiedDate: Date;
  isDeleted: boolean;
  invoice?: IInvoice[];
}

export interface IPatientViewData {
  patient: IPatientName;
  mobileNumber: string;
  reportId: string;
  invoiceInvestigation: IInvoiceInvestigation[];
}

export interface IDownloadPatientReportData {
  base64: string;
}
