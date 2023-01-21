export interface ILocalStoragePatientAuth {
  reportId: string | null;
  mobileNumber: string | null;
  clearPatientAuth(): void;
}
