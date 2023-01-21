import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AppUsers } from '../../consts/auth';
import { useAuthContext } from '../../core/contexts/auth';
import { usePostMutation, useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import {
  IClinicDetails,
  ILoginAsClinicPayload,
  ILoginAsClinicResponse,
  ILoginAsClinicVerifyPayload,
} from '../../interfaces/controllers/auth';
import { errorToast, successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import UiPaths from '../../paths/uiPaths';

export const useLoginAsClinic = () => {
  const { mutate, isLoading, data } = usePostMutation<
    IAxiosResponse<{}>,
    ILoginAsClinicPayload
  >(
    {
      path: ApiPaths.Clinic.Login(),
      isPrivate: false,
    },
    {
      onError: () => {
        errorToast('Failed!');
      },
    }
  );
  return {
    mutateLoginAsClinic: mutate,
    isLoadingLoginAsClinic: isLoading,
    loginAsClinicData: data,
  };
};

const onSuccess = (
  data: IAxiosResponse<ILoginAsClinicResponse>,
  navigate: NavigateFunction,
  setAccessToken: (value: string) => void,
  setClinicDetails: (value: IClinicDetails) => void,
  setUserRole: (value: string[]) => void,
  setIsLoggedIn: (value: boolean) => void
) => {
  const { isSuccess, message, body } = data;
  if (isSuccess) {
    const { access_token, clinicDetails } = body;

    setAccessToken(access_token);
    setClinicDetails(clinicDetails);
    setUserRole([AppUsers.ClinicUser]);
    setIsLoggedIn(!!access_token);

    navigate(UiPaths.ClinicDetails, { replace: true });
    successToast('Success!');
  } else {
    errorToast(message);
  }
};

export const useLoginAsClinicVerify = ({
  mobile,
  code,
}: ILoginAsClinicVerifyPayload) => {
  const navigate = useNavigate();
  const { setAccessToken, setClinicDetails, setUserRole, setIsLoggedIn } =
    useAuthContext();

  const { refetch, isLoading } = useReactQuery<
    IAxiosResponse<ILoginAsClinicResponse>
  >(
    [{ queryPath: ApiPaths.Clinic.Verify({ mobile, code }), isPrivate: false }],
    {
      enabled: false,
      onSuccess: (data) =>
        onSuccess(
          data,
          navigate,
          setAccessToken,
          setClinicDetails,
          setUserRole,
          setIsLoggedIn
        ),
      onError: () => {
        errorToast('Failed to login!');
      },
    }
  );

  return {
    refetchLoginAsClinicVerify: refetch,
    isLoadingLoginAsClinicVerify: isLoading,
  };
};
