export interface ILoginAsClinicPayload {
  mobile: string;
}

export interface ILoginAsClinicVerifyPayload {
  mobile: string;
  code: string;
}

export interface ILoginAsClinicCodePayload {
  code: string;
}
