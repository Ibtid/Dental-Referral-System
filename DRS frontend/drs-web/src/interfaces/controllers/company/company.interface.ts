interface IBriefCompanyUser {
  id: number;
  companyId: number;
  userId: number;
  createdDate: Date;
  lastModifiedBy: number;
  lastModifiedDate: Date;
  isDeleted: boolean;
}

export interface ICompany {
  id: number;
  name: string;
  shortName: string;
  address: string;
  contactNumber: string;
  email: string;
  website: string;
  status: string;
  logoPath: string;
  createdDate: Date;
  lastModifiedBy: number;
  lastModifiedDate: Date;
  isDeleted: boolean;
  user?: IBriefCompanyUser[];
}
