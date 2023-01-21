import { NavigateFunction, useNavigate } from 'react-router-dom';
import { usePostMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IForgetPasswordPayload } from '../../interfaces/controllers/auth/forgetPasswordPayload.interface';
import { errorToast, successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import UiPaths from '../../paths/uiPaths';

const onSuccess = (
  data: IAxiosResponse<{}>,
  navigate: NavigateFunction,
  variables: IForgetPasswordPayload
) => {
  const { isSuccess, message } = data;
  if (isSuccess) {
    successToast('We have sent a verification code to your email');
    navigate(UiPaths.ResetPassword, {
      replace: true,
      state: { email: variables.email },
    });
  } else {
    errorToast(message);
  }
};

export const useForgetPassword = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = usePostMutation<
    IAxiosResponse<{}>,
    IForgetPasswordPayload
  >(
    {
      path: ApiPaths.Auth.Forget,
      isPrivate: false,
    },
    {
      onSuccess: (data, variables) => onSuccess(data, navigate, variables),
      onError: () => {
        errorToast('Something Went Wrong!');
      },
    }
  );
  return { mutateForgetPassword: mutate, isLoading };
};
