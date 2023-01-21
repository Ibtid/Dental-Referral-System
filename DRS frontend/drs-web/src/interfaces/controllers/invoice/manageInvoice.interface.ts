export interface IManageInvoice {
  id: number;
  reportId: string;
  patient: {
    id: number;
    name: string;
    age: number;
    address: string;
  };
  clinic: {
    id: number;
    name: string;
  };
  companyId: number;
  mobileNumber: string;
  deliveryTime: Date;
  createdDate: Date;
  invoiceInvestigation: {
    id: number;
  }[];
}
