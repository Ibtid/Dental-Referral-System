export interface IClinicDetails {
  id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
  phone: string;
  longitude: string;
  latitude: string;
  status: string;
  createdDate: Date;
  lastModifiedBy: number;
  lastModifiedDate: Date;
  isDeleted: boolean;
}

export interface ILoginAsClinicResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  clinicDetails: IClinicDetails;
}
