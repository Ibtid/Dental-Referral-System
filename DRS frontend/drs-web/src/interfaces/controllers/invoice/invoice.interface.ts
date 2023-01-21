export interface IInvoice {
  id: number;
  reportId: string;
  deliveryTime: Date;
  grossTotal: number;
  total: number;
  discount: number;
  paid: number;
  due: number;
  mobileNumber: string;
  paymentMethod: string;
  patient: {
    id: number;
    name: string;
    address: string;
    email: string;
    age: number;
    gender: string;
  };
  clinic?: {
    name: string;
  };
  invoiceInvestigation: {
    id: number;
    reportUploaded: false;
    investigation: {
      name: string;
      cost: number;
    };
  }[];
}
