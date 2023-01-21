export interface IInvoiceInvestigationUploadResponse {
  id: number;
  invoiceId: string;
  investigationId: number;
  amount: string;
  reportpath: string;
  reportUploaded: boolean;
  createdDate: Date;
  lastModifiedBy: number;
  lastModifiedDate: Date;
  isDeleted: boolean;
}
