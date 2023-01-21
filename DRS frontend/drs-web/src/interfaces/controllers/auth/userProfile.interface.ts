interface ICompanyUser {
  company: {
    name: string;
  };
}

export interface IUserProfile {
  id: number;
  fullName: string;
  userName: string;
  role: string[];
  phone: string;
  email: string;
  createdDate: Date;
  lastModifiedDate: Date;
  lastModifiedBy?: number;
  companyUser?: ICompanyUser;
}
