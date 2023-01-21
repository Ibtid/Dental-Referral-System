export interface IClinicCardData {
  totalReferredPatient: number;
  investigationCount: {
    investigation: string;
    count: number;
  }[];
}
