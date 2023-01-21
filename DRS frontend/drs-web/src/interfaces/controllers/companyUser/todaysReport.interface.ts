interface IPatient {
  name: string;
  gender: string;
}

interface IClinic {
  name: string;
  email: string;
}

interface IInvestigation {
  name: string;
}

interface IInvoiceInvestigation {
  investigation: IInvestigation;
  amount: string;
}

export interface ITodaysReport {
  patient: IPatient;
  createdDate: Date;
  clinic: IClinic;
  grossTotal: string;
  discount: string;
  total: string;
  mobileNumber: string;
  paid: string;
  due: string;
  paymentMethod: string;
  paymentDescription: string;
  deliveryTime: Date;
  invoiceInvestigation: IInvoiceInvestigation[];
}
