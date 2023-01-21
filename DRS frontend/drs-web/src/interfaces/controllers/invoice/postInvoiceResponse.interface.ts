export interface IPostInvoiceResponse {
  invoice: {
    id: number;
    reportId: string;
    patientId: number;
    clinicId?: number;
    companyId: number;
    discount: string;
    mobileNumber: string;
    deliveryTime: Date;
    grossTotal: string;
    total: string;
    paid: string;
    due: string;
    paymentMethod: string;
    paymentDescription: string;
    firstVisit: Date;
    createdDate: Date;
    lastModifiedBy: number;
    lastModifiedDate: Date;
    isDeleted: boolean;
  };
  print: string;
}
