import {
  Control,
  DeepRequired,
  FieldErrorsImpl,
  UseFormRegister,
} from 'react-hook-form';
import { IInvoiceCreatePostPayload } from '../../controllers/invoice';

export interface IPaymentInfo {
  register: UseFormRegister<IInvoiceCreatePostPayload>;
  errors: FieldErrorsImpl<DeepRequired<IInvoiceCreatePostPayload>>;
  control: Control<IInvoiceCreatePostPayload, object>;
}
