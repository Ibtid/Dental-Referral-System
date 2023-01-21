export interface ISms {
  id: number;
  receiverPhone: string;
  message: string;
  timeStamp: Date;
  clinic: {
    id: number;
    name: string;
  };
  companyId: number;
  status: string;
  statusMessage: string;
  type: string;
  createdDate: Date;
  lastModifiedBy: number;
  lastModifiedDate: Date;
  isDeleted: boolean;
}
