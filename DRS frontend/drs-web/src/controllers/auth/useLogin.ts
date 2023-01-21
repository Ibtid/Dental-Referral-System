import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../core/contexts/auth';
import { usePostMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { ILocationState } from '../../interfaces/components/auth';
import {
  ILoginPayload,
  ILoginResponse,
  IUserProfile,
} from '../../interfaces/controllers/auth';
import { errorToast, successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';

const onSuccess = (
  data: IAxiosResponse<ILoginResponse>,
  navigate: NavigateFunction,
  prevPath: string,
  setAccessToken: (value: string) => void,
  setUserProfile: (value: IUserProfile) => void,
  setUserRole: (value: string[]) => void,
  setIsLoggedIn: (value: boolean) => void
) => {
  const { isSuccess, message, body } = data;
  if (isSuccess) {
    const { access_token, user_profile } = body;

    setAccessToken(access_token);
    setUserProfile(user_profile);
    setUserRole(user_profile.role);
    setIsLoggedIn(!!access_token);

    navigate(prevPath, { replace: true });
    successToast('Successfully Logged In!');
  } else {
    errorToast(message);
  }
};

export const useLogin = () => {
  const { setAccessToken, setUserProfile, setUserRole, setIsLoggedIn } =
    useAuthContext();
  const navigate = useNavigate();
  const { state } = useLocation();

  let prevPath = '/';
  if (state) {
    const { pathname } = state as ILocationState;
    prevPath = pathname;
  }

  const { mutate, isLoading } = usePostMutation<
    IAxiosResponse<ILoginResponse>,
    ILoginPayload
  >(
    {
      path: ApiPaths.Auth.Login,
      isPrivate: false,
    },
    {
      onSuccess: (data) =>
        onSuccess(
          data,
          navigate,
          prevPath,
          setAccessToken,
          setUserProfile,
          setUserRole,
          setIsLoggedIn
        ),
      onError: () => {
        errorToast('Failed to login!');
      },
    },
    { withCredentials: true }
  );
  return { mutateLogin: mutate, isLoading };
};
