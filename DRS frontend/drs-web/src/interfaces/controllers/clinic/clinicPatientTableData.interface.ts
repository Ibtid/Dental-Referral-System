export interface IClinicPatientTableData {
  patient: {
    name: string;
    contactNumber: string;
  };
  invoiceInvestigation: {
    investigation: {
      name: string;
    };
  }[];

  createdDate: Date;
}
