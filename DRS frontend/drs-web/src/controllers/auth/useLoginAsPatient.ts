import { NavigateFunction, useNavigate } from 'react-router-dom';
import { usePostMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { ILoginAsPatientPayload } from '../../interfaces/controllers/auth';
import { errorToast, successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import UiPaths from '../../paths/uiPaths';

const onSuccess = (data: IAxiosResponse<{}>, navigate: NavigateFunction) => {
  const { isSuccess, message } = data;
  if (isSuccess) {
    navigate(UiPaths.PatientReports, { replace: true });
    successToast('Success!');
  } else {
    errorToast(message);
  }
};

export const useLoginAsPatient = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = usePostMutation<
    IAxiosResponse<{}>,
    ILoginAsPatientPayload
  >(
    {
      path: ApiPaths.Patient.LoginAsPatient(),
      isPrivate: false,
    },
    {
      onSuccess: (data) => onSuccess(data, navigate),
      onError: () => {
        errorToast('Failed to login!');
      },
    }
  );
  return { mutateLoginAsPatient: mutate, isLoading };
};
