import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IPatientViewData } from '../../interfaces/controllers/patient';
import ApiPaths from '../../paths/apiPaths';

export const useGetPatientDetails = (
  invoiceNumber: string,
  mobileNumber: string
) => {
  const { data, isLoading } = useReactQuery<IAxiosResponse<IPatientViewData>>([
    { queryPath: ApiPaths.Patient.PatientView(invoiceNumber, mobileNumber) },
  ]);

  return { patientDetails: data, isLoading };
};
