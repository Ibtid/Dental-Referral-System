export interface IInvoiceCreatePostPayload {
  patientId?: number;
  clinicId?: number;
  investigation: number[];
  mobileNumber: string;
  discount: number;
  paid: number;
  paymentMethod: string;
  paymentDescription: string;
  deliveryTime: Date;
}
