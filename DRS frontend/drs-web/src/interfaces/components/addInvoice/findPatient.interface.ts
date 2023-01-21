import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormRegister,
} from 'react-hook-form';
import { IInvoiceCreatePostPayload } from '../../controllers/invoice';
import { IPatient } from '../../controllers/patient';

export interface IFindPatient {
  searchData: string | undefined;

  setSearchData: React.Dispatch<
    React.SetStateAction<{
      patient: string;
      clinic: string;
    }>
  >;
  setSelectedPatient: React.Dispatch<
    React.SetStateAction<IPatient | undefined>
  >;
  manualErrors: string | undefined;
  setManualErrors: React.Dispatch<
    React.SetStateAction<
      | {
          patient?: string;
          investigation?: string;
        }
      | undefined
    >
  >;
}
