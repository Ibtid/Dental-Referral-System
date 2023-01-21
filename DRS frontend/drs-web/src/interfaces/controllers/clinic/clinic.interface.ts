export interface IClinic {
  id: number;
  name: string;
  address: string;
  mobile: string;
  phone: string;
  email: string;
  longitude?: number;
  latitude?: number;
  status?: string;
  dueAmount: number;
}
