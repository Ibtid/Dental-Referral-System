export interface IFinance {
  id: number;
  reportId: string;
  patient: {
    id: number;
    name: string;
    gender: string;
    address: string;
  };
  clinic: {
    id: number;
    name: string;
  };
  companyId: number;
  discount: number;
  mobileNumber: number;
  deliveryTime: Date;
  grossTotal: number;
  total: number;
  paid: number;
  due: number;
  paymentMethod: string;
  paymentDescription: string;
  createdDate: Date;
}
