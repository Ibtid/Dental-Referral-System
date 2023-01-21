export interface ICompanyUser {
  id: number;
  companyId: number;
  user: {
    id: number;
    fullName: string;
    userName: string;
    email: string;
    role: string[];
    phone: string;
  };
  createdDate: Date;
  lastModifiedBy: number;
  lastModifiedDate: Date;
  isDeleted: boolean;
}
