export interface IPatientCreatePatchPayload {
  id: number;
  name: string;
  gender: string;
  address: string;
  contactNumber: string;
  email?: string;
  age: number;
}
