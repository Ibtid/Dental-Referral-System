import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppUsers } from '../consts/auth';
import { useRefreshToken } from '../core/axios';
import { useAuthContext } from '../core/contexts/auth';
import UiPaths from '../paths/uiPaths';

const useAuthVarification = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    isLoggedIn,
    setAccessToken,
    setUserProfile,
    setClinicDetails,
    setUserRole,
    setIsLoggedIn,
  } = useAuthContext();

  const refresh = useRefreshToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRefresh = async () => {
      const response = await refresh();
      if (response.isSuccess) {
        const { access_token, user_profile, clinicDetails } = response.body;

        setAccessToken(access_token);
        setIsLoggedIn(!!access_token);
        if (user_profile) {
          setUserProfile(user_profile);
          setUserRole(user_profile.role);
        } else {
          setClinicDetails(clinicDetails!);
          setUserRole([AppUsers.ClinicUser]);
        }
      } else {
        navigate(UiPaths.Login);
      }
      setIsLoading(false);
    };

    if (!isLoggedIn) {
      fetchRefresh();
    } else {
      setIsLoading(false);
    }
  }, []);

  return { isLoading };
};

export default useAuthVarification;
