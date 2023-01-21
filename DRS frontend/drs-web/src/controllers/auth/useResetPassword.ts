import { NavigateFunction, useNavigate } from 'react-router-dom';
import { usePostMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IResetPasswordPayload } from '../../interfaces/controllers/auth/resetPasswordPayload.interface';
import { errorToast, successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import UiPaths from '../../paths/uiPaths';

const onSuccess = (data: IAxiosResponse<{}>, navigate: NavigateFunction) => {
  const { isSuccess, message } = data;
  if (isSuccess) {
    successToast('Success! Please login with your new password');
    navigate(UiPaths.Login, {
      replace: true,
    });
  } else {
    errorToast(message);
  }
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = usePostMutation<
    IAxiosResponse<{}>,
    IResetPasswordPayload
  >(
    {
      path: ApiPaths.Auth.Reset,
      isPrivate: false,
    },
    {
      onSuccess: (data) => onSuccess(data, navigate),
      onError: () => {
        errorToast('Something Went Wrong!');
      },
    }
  );
  return { mutateResetPassword: mutate, isLoading };
};
