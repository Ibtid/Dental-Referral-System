export interface ISuccessMessageModalForAddInvoice {
  base64: string;
  setBase64: React.Dispatch<React.SetStateAction<string>>;
  selectedClinicName: string | undefined;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedClinicName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}
