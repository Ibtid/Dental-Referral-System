import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../core/contexts/auth';
import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { errorToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import UiPaths from '../../paths/uiPaths';

const onSuccess = (
  data: IAxiosResponse<{}>,
  navigate: NavigateFunction,
  setLogout: () => void
) => {
  const { isSuccess, message } = data;
  if (isSuccess) {
    setLogout();
    navigate(UiPaths.Login, { replace: true });
  } else {
    errorToast(message);
  }
};

export const useLogout = () => {
  const { setLogout } = useAuthContext();
  const navigate = useNavigate();

  const { refetch } = useReactQuery<IAxiosResponse<{}>>(
    [{ queryPath: ApiPaths.Auth.Logout, isPrivate: false }],
    {
      enabled: false,
      onSuccess: (data) => onSuccess(data, navigate, setLogout),
      onError: () => {
        errorToast('Failed to Logout!');
      },
    },
    { withCredentials: true }
  );
  return { refetchLogout: refetch };
};
