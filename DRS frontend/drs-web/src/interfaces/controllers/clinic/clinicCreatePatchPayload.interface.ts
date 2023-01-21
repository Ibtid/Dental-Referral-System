export interface IClinicCreatePatchPayload {
  id: number;
  name: string;
  address: string;
  mobile: string;
  phone: string;
  email: string;
  longitude?: string;
  latitude?: string;
  status?: string;
}
