import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../core/contexts/auth';
import { IAllowedRoles } from '../../interfaces/routes';
import UiPaths from '../../paths/uiPaths';

export default function Private({ allowedRoles }: IAllowedRoles) {
  const { userRole } = useAuthContext();

  const location = useLocation();

  const isvalid = allowedRoles.some((role) => userRole.includes(role));

  if (isvalid) return <Outlet />;

  return (
    <Navigate
      to={UiPaths.NotFound}
      state={{ pathname: location.pathname }}
      replace
    />
  );
}
