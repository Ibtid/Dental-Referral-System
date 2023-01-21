import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../core/contexts/auth';
import { usePostMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IChangePasswordPayload } from '../../interfaces/controllers/auth/changePasswordPayload.interface';
import { errorToast, successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import UiPaths from '../../paths/uiPaths';

const onSuccess = (
  data: IAxiosResponse<{}>,
  navigate: NavigateFunction,
  setLogout: () => void
) => {
  const { isSuccess, message } = data;
  if (isSuccess) {
    successToast('Password Changed Successfully!');
    setLogout();
    navigate(UiPaths.Login);
  } else {
    errorToast(message);
  }
};

export const useChangePassword = () => {
  const navigate = useNavigate();
  const { setLogout } = useAuthContext();
  const { mutate, isLoading } = usePostMutation<
    IAxiosResponse<{}>,
    IChangePasswordPayload
  >(
    {
      path: ApiPaths.Auth.Change,
      isPrivate: true,
    },
    {
      onSuccess: (data) => onSuccess(data, navigate, setLogout),
      onError: () => {
        errorToast('Something Went Wrong!');
      },
    }
  );
  return { mutateChangePassword: mutate, isLoading };
};
