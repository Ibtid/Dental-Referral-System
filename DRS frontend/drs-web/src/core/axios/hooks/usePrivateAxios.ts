import { useEffect } from 'react';
import requestInterceptor from '../interceptors/requestInterceptor';
import responseInterceptor from '../interceptors/responseInterceptor';
import { axiosPrivateInstance } from '../instances';
import axiosRequests from '../helpers/axiosRequests';
import { useAuthContext } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';

export const usePrivateAxios = () => {
  const {
    getRequest: privateGet,
    postRequest: privatePost,
    putRequest: privatePut,
    patchRequest: privatePatch,
    deleteRequest: privateDelete,
  } = axiosRequests(axiosPrivateInstance);

  const { accessToken } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = requestInterceptor(
      axiosPrivateInstance,
      accessToken
    );
    const responseIntercept = responseInterceptor(
      axiosPrivateInstance,
      navigate
    );
    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return { privateGet, privatePost, privatePut, privatePatch, privateDelete };
};
