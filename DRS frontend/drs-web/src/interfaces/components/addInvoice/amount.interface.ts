import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormRegister,
} from 'react-hook-form';
import { IInvestigation } from '../../controllers/investigations';
import { IInvoiceCreatePostPayload } from '../../controllers/invoice';

export interface IAmount {
  selectedInvestigations: IInvestigation[];
  formData: {
    discount: number;
    paid: number;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      discount: number;
      paid: number;
    }>
  >;
  register: UseFormRegister<IInvoiceCreatePostPayload>;
  errors: FieldErrorsImpl<DeepRequired<IInvoiceCreatePostPayload>>;
}
