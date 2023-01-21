import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppUsers } from '../../consts/auth';
import { useLogout } from '../../controllers/auth';
import { useAuthContext } from '../../core/contexts/auth';
import useCollapseSideNav from '../../hooks/useCollapseSideNav';
import UiPaths from '../../paths/uiPaths';

export const TopNav: FC = () => {
  const collapseSideNav = useCollapseSideNav();
  const { refetchLogout } = useLogout();
  const navigate = useNavigate();
  const { userRole } = useAuthContext();
  const handleUserProfile = (path: string) => {
    if (path === 'Profile') {
      navigate(UiPaths.Profile);
    } else {
      navigate(UiPaths.ClinicUserProfile);
    }
  };

  const handleLogout = () => {
    refetchLogout();
  };

  const { CompanyAdmin, CompanyOperator, SuperAdmin } = AppUsers;
  const DRSUsers = [CompanyAdmin, CompanyOperator, SuperAdmin];

  const isDRSUser = DRSUsers.some((role) => userRole.includes(role));

  return (
    <div className='topNav d-flex align-items-center justify-content-between py-3 px-3'>
      {isDRSUser ? (
        <div
          className='menuBar'
          onClick={() => collapseSideNav()}
          id='menu-toggle'
        >
          <svg
            width='16'
            height='12'
            viewBox='0 0 16 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M15.42 0.75H0.419998V2.25H15.42V0.75Z' fill='white' />
            <path d='M11.67 5.25H0.419998V6.75H11.67V5.25Z' fill='white' />
            <path d='M7.92 9.75H0.419998V11.25H7.92V9.75Z' fill='white' />
          </svg>
        </div>
      ) : (
        <div className='topNav-logo'>
          <svg
            id='Layer_1'
            xmlns='http://www.w3.org/2000/svg'
            x={0}
            y={0}
            viewBox='0 0 145.6 32.5'
            xmlSpace='preserve'
          >
            <style>{'.st1{fill:#fff}'}</style>
            <path
              d='M28 10.7c-3.1-4.3-8.1-7-13.8-7S3.5 6.5.4 10.7C-.4 7.6-.2 4.3 2.3 2c3.3-3 7.5-1.6 10-.3 1.2.6 2.7.6 3.9 0C18.7.4 22.9-1 26.2 2c2.6 2.3 2.7 5.6 1.8 8.7z'
              style={{
                fill: '#fff',
                fillOpacity: 0.7,
              }}
            />
            <path
              className='st1'
              d='M5.7 23.7c-.2-1.8-.7-3.5-1.3-5.1 0 0 6.2.3 9.3 3.7-.9.2-1.7.8-1.9 1.9-.6 2.4-.8 5.1-.9 6.8-.1 1.1-1.3 1.8-2.3 1.2-1.8-1.2-2.3-4.1-2.8-8.4l-.1-.1z'
            />
            <path
              className='st1'
              d='M14.3 3.6c-5.7 0-10.7 2.8-13.8 7 .5 1.6 1.2 3.1 2 4.3.7 1.1 1.4 2.3 1.9 3.6 11.1-.5 12.5 5.4 12.6 6.7 0 .2.1.5.1.7.3 1.9.5 3.8.6 5.2.1 1.1 1.3 1.8 2.3 1.2 1.8-1.2 2.3-4.1 2.8-8.4v-.2c.4-3.1 1.5-6.1 3.2-8.7.8-1.3 1.5-2.8 2-4.3-3.1-4.3-8.1-7.1-13.7-7.1zm4 8.7h-3.1v3.1h-2v-3.1h-3.1v-2h3.1v-3h2v3.1h3.1v1.9zM36.6 0H42c1 0 2 .2 3 .6.9.4 1.7 1 2.4 1.7s1.2 1.6 1.6 2.5c.4 1 .6 2 .6 3 0 1.1-.2 2-.6 3-.4.9-1 1.7-1.6 2.4-.7.7-1.5 1.2-2.4 1.6-.9.4-1.9.6-3 .6h-5.4V0zM42 12.8c.7 0 1.4-.1 2-.4s1.1-.6 1.6-1 .8-.9 1.1-1.5c.2-.6.3-1.3.3-2s-.1-1.4-.4-2-.6-1.2-1.1-1.7c-.5-.5-1-.9-1.6-1.2s-1.3-.4-2-.4h-2.7v10.1H42zM53.9 10.1c0 .5.1.9.3 1.3.2.4.4.7.7 1 .3.3.7.5 1.1.7.4.2.8.3 1.3.3.8 0 1.4-.2 2-.6.5-.4.9-.9 1.2-1.5h2.8c-.2.8-.6 1.5-1 2.1-.4.6-.9 1.1-1.4 1.4s-1.1.6-1.7.8c-.6.2-1.2.3-1.8.3-.8 0-1.6-.2-2.3-.5-.7-.3-1.4-.7-1.9-1.3-.5-.5-1-1.2-1.3-1.9-.3-.7-.5-1.5-.5-2.3 0-.8.2-1.6.5-2.3.3-.7.7-1.4 1.3-1.9.5-.5 1.2-1 1.9-1.3.7-.3 1.5-.5 2.3-.5.9 0 1.8.2 2.5.5s1.4.8 1.9 1.4c.5.6.9 1.2 1.2 2 .3.7.4 1.5.5 2.3h-9.6zm6.6-1.8c-.2-.6-.6-1.1-1.2-1.6-.6-.4-1.2-.6-2-.6-.7 0-1.4.2-2 .6-.6.4-.9 1-1.2 1.6h6.4zM72.9 8.9c0-.3-.1-.6-.2-.9-.1-.3-.3-.6-.5-.8-.2-.2-.5-.4-.8-.5-.3-.1-.6-.2-.9-.2-.3 0-.7.1-.9.2-.3.1-.6.3-.8.5-.2.2-.4.5-.5.8-.3.3-.3.6-.3.9v6.5h-2.6v-11H68V5c.3-.4.6-.6 1.1-.8.4-.2.9-.3 1.4-.3.7 0 1.3.1 1.9.4.6.3 1.1.6 1.6 1.1.5.5.8 1 1.1 1.6.3.6.4 1.3.4 1.9v6.5h-2.6V8.9zM78.1 7V4.4h1V0h2.6v4.4h2.6V7h-2.6v8.5h-2.6V7h-1zM85.7 9.9c0-.8.2-1.6.5-2.3.3-.7.7-1.4 1.3-1.9.5-.5 1.2-1 1.9-1.3.7-.3 1.5-.5 2.3-.5.8 0 1.6.2 2.3.5.7.3 1.4.7 1.9 1.3.5.5 1 1.2 1.3 1.9.3.7.5 1.5.5 2.3v5.5h-2.6v-.6c-1 .7-2.1 1.1-3.4 1.1-.9 0-1.7-.2-2.5-.5-.7-.3-1.4-.7-1.9-1.3-.5-.5-.9-1.2-1.2-1.9-.3-.7-.4-1.5-.4-2.3zm2.5 0c0 .5.1.9.3 1.3.2.4.4.8.7 1.1.3.3.7.6 1.1.7.4.2.9.3 1.3.3.5 0 .9-.1 1.3-.3.4-.2.8-.4 1.1-.7s.6-.7.7-1.1.3-.9.3-1.4c0-.5-.1-.9-.3-1.3-.2-.4-.4-.8-.7-1.1-.3-.3-.7-.6-1.1-.7-.4-.2-.9-.3-1.3-.3-.5 0-.9.1-1.3.3-.4.2-.8.4-1.1.7-.3.3-.6.7-.7 1.1-.2.5-.3.9-.3 1.4zM100.3 0h2.6v15.4h-2.6V0zM36.6 19.4h3.2c.5 0 1 .1 1.4.2.4.1.8.3 1.1.6.3.3.5.6.7 1 .2.4.2.9.2 1.4 0 .5-.1 1-.3 1.5-.2.5-.5.8-.9 1 .1 0 .2.1.4.2.1.1.3.2.4.4l.3.6c.1.3.1.6.1 1v2.3h-1.7v-2.3c0-.3 0-.5-.1-.6-.1-.2-.2-.3-.4-.4-.1-.1-.3-.2-.5-.2s-.4-.1-.6-.1h-1.6v3.7h-1.7V19.4zm4.9 3.3c0-.5-.2-.9-.5-1.2-.3-.3-.8-.4-1.3-.4h-1.5v3.2h1.5c.6 0 1-.1 1.3-.4s.5-.7.5-1.2zM46.2 26.1c0 .3.1.6.2.8.1.3.3.5.5.7.2.2.4.3.7.5.3.1.6.2.9.2.5 0 .9-.1 1.3-.4.4-.2.6-.6.8-1h1.8c-.2.6-.4 1-.7 1.4-.3.4-.6.7-.9.9-.3.2-.7.4-1.1.5-.4.1-.8.2-1.2.2-.6 0-1.1-.1-1.6-.3-.5-.2-.9-.5-1.3-.8-.4-.4-.6-.8-.8-1.3-.2-.5-.3-1-.3-1.6 0-.6.1-1.1.3-1.6.2-.5.5-.9.8-1.3.4-.4.8-.6 1.3-.8.5-.2 1-.3 1.6-.3.6 0 1.2.1 1.6.3.5.2.9.5 1.2.9.3.4.6.8.8 1.3.2.5.3 1 .3 1.5h-6.2zm4.3-1.1c-.1-.4-.4-.8-.8-1-.4-.3-.8-.4-1.3-.4s-.9.1-1.3.4-.6.6-.8 1h4.2zM57 21.3c0-.1 0-.2-.1-.3-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3.1-.1.1-.1.2-.1.3v2.2h1.7v1.7h-1.7v4.5h-1.7v-4.5h-.7v-1.7h.7v-2.2c0-.3.1-.6.2-.8s.3-.5.5-.7c.2-.2.4-.4.7-.5.3-.1.5-.2.8-.2.3 0 .6.1.8.2.3.1.5.3.7.5.2.2.3.4.5.7s.2.5.2.8v.4H57v-.4zM61.1 26.1c0 .3.1.6.2.8.1.3.3.5.5.7.2.2.4.3.7.5.3.1.6.2.9.2.5 0 .9-.1 1.3-.4.4-.2.6-.6.8-1h1.8c-.2.6-.4 1-.7 1.4-.3.4-.6.7-.9.9s-.7.4-1.1.5c-.4.1-.8.2-1.2.2-.6 0-1.1-.1-1.6-.3-.5-.2-.9-.5-1.3-.8-.4-.4-.6-.8-.8-1.3-.2-.5-.3-1-.3-1.6 0-.6.1-1.1.3-1.6.2-.5.5-.9.8-1.3.4-.4.8-.6 1.3-.8.5-.2 1-.3 1.6-.3.6 0 1.2.1 1.6.3.5.2.9.5 1.2.9.3.4.6.8.8 1.3.2.5.3 1 .3 1.5h-6.2zm4.3-1.1c-.1-.4-.4-.8-.8-1-.4-.3-.8-.4-1.3-.4s-.9.1-1.3.4-.6.6-.8 1h4.2zM73.1 23.8c-.3 0-.6.1-.9.2-.3.1-.6.3-.9.5-.3.2-.5.5-.6.8-.2.3-.2.7-.2 1.1v3.2h-1.7v-7.3h1.7v1c.2-.2.4-.4.7-.6.2-.2.5-.3.8-.4.3-.1.5-.2.8-.2.3 0 .5-.1.7-.1l-.4 1.8zM78.7 23.8c-.3 0-.6.1-.9.2-.3.1-.6.3-.9.5-.3.2-.5.5-.6.8-.2.3-.2.7-.2 1.1v3.2h-1.7v-7.3h1.7v1c.2-.2.4-.4.7-.6.2-.2.5-.3.8-.4.3-.1.5-.2.8-.2.3 0 .5-.1.7-.1l-.4 1.8zM79.5 26c0-.6.1-1.1.3-1.6.2-.5.5-.9.9-1.3s.8-.6 1.3-.8c.5-.2 1-.3 1.6-.3.6 0 1.1.1 1.6.3.5.2.9.5 1.3.8.4.4.6.8.8 1.3.2.5.3 1 .3 1.6v3.7h-1.7v-.4c-.7.5-1.4.7-2.3.7-.6 0-1.1-.1-1.6-.3-.5-.2-.9-.5-1.3-.8-.3-.4-.6-.8-.8-1.3-.3-.5-.4-1.1-.4-1.6zm1.7 0c0 .3.1.6.2.9.1.3.3.5.5.7.2.2.4.4.7.5.3.1.6.2.9.2s.6-.1.9-.2c.3-.1.5-.3.7-.5.2-.2.4-.4.5-.7.1-.3.2-.6.2-.9 0-.3-.1-.6-.2-.9-.1-.3-.3-.5-.5-.7-.2-.2-.4-.4-.7-.5-.3-.1-.6-.2-.9-.2s-.6.1-.9.2c-.3.1-.5.3-.7.5-.2.2-.4.4-.5.7-.2.3-.2.6-.2.9zM89.2 19.4h1.7v10.2h-1.7V19.4zM102.2 26.8c0-.3-.1-.5-.2-.7-.1-.2-.3-.4-.5-.5-.2-.1-.5-.3-.7-.4l-.9-.3c-.3-.1-.7-.2-1-.4-.4-.2-.7-.3-1-.6-.3-.2-.6-.5-.8-.8-.2-.3-.3-.7-.3-1.1 0-.4.1-.8.3-1.2.2-.4.5-.7.8-1 .3-.3.7-.5 1.1-.6.4-.2.9-.2 1.3-.2.6 0 1.1.1 1.6.3.4.2.8.5 1.1.8.3.3.5.7.6 1 .1.4.2.7.2.9H102c-.1-.4-.3-.8-.5-1-.3-.3-.7-.4-1.2-.4s-1 .1-1.3.4c-.3.3-.5.5-.5.9 0 .2.1.4.2.5.1.1.3.3.5.4l.6.3c.2.1.4.1.6.2.4.1.8.3 1.2.4.4.2.8.4 1.1.6.3.3.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1.9-.3 1.3s-.5.7-.8 1c-.3.3-.7.5-1.2.6-.4.1-.9.2-1.4.2-.5 0-1-.1-1.4-.3-.5-.2-.9-.4-1.2-.8-.4-.3-.6-.7-.9-1.2-.2-.5-.3-1-.3-1.7H98c0 .3 0 .6.1.9.1.3.2.5.4.7.2.2.4.4.6.5.3.1.5.2.9.2.6 0 1.1-.1 1.4-.4.6.1.8-.3.8-.8zM110.4 22.4h1.7v4.3c0 .4 0 .7-.1 1.1-.1.3-.2.7-.5 1-.2.3-.5.5-.8.8-.3.2-.7.4-1.1.5v2.6H108v-2.6c-.4-.1-.7-.3-1-.5-.3-.2-.6-.5-.8-.7-.2-.3-.4-.6-.5-.9-.1-.3-.2-.7-.2-1.1v-4.3h1.7v4.3c0 .2 0 .4.1.6.1.2.2.4.3.5.1.1.3.3.5.3.2.1.4.1.6.1.2 0 .4 0 .6-.1.2-.1.4-.2.5-.3.1-.1.3-.3.3-.5.1-.2.1-.4.1-.6v-4.5zM117.2 27.6v-.3c0-.1-.1-.2-.1-.2-.1-.1-.2-.1-.3-.2-.1-.1-.3-.1-.6-.2l-.8-.2c-.5-.1-.9-.4-1.2-.7-.3-.4-.5-.8-.5-1.3 0-.3.1-.6.2-.9.1-.3.3-.5.6-.7.2-.2.5-.4.8-.5.3-.1.6-.2 1-.2s.8.1 1 .2c.3.2.5.3.7.6.2.2.3.5.4.7.1.3.2.5.2.7H117s0-.1-.1-.2c0-.1-.1-.2-.1-.2l-.2-.2c-.1-.1-.2-.1-.4-.1s-.4.1-.6.2c-.2.1-.3.3-.3.5 0 .1 0 .2.1.3.1.1.2.2.3.2.1.1.2.1.4.1.1 0 .2.1.3.1l.8.3c.5.2.9.5 1.3.8.3.4.5.9.5 1.5 0 .4-.1.7-.2 1-.2.3-.4.5-.6.7-.3.2-.5.4-.9.5-.3.1-.7.2-1 .2-.4 0-.7-.1-1-.2-.3-.1-.6-.3-.9-.6-.2-.2-.4-.5-.6-.9s-.2-.7-.2-1.1h1.7c0 .1 0 .3.1.4 0 .1.1.3.2.4l.3.3c.1.1.3.1.5.1.3 0 .5-.1.7-.3 0-.2.1-.4.1-.6zM120.1 24.1v-1.7h.7v-2.9h1.7v2.9h1.7v1.7h-1.7v5.6h-1.7v-5.6h-.7zM126.5 26.1c0 .3.1.6.2.8.1.3.3.5.5.7.2.2.4.3.7.5.3.1.6.2.9.2.5 0 .9-.1 1.3-.4.4-.2.6-.6.8-1h1.8c-.2.6-.4 1-.7 1.4-.3.4-.6.7-.9.9s-.7.4-1.1.5c-.4.1-.8.2-1.2.2-.6 0-1.1-.1-1.6-.3-.5-.2-.9-.5-1.3-.8-.4-.4-.6-.8-.8-1.3-.2-.5-.3-1-.3-1.6 0-.6.1-1.1.3-1.6.2-.5.5-.9.8-1.3.4-.4.8-.6 1.3-.8.5-.2 1-.3 1.6-.3.6 0 1.2.1 1.6.3.5.2.9.5 1.2.9.3.4.6.8.8 1.3.2.5.3 1 .3 1.5h-6.2zm4.4-1.1c-.1-.4-.4-.8-.8-1-.4-.3-.8-.4-1.3-.4s-.9.1-1.3.4-.6.6-.8 1h4.2zM134.1 22.4h1.7v.4c.2-.3.5-.5.7-.6.3-.1.5-.2.9-.2.5 0 .9.1 1.3.3.4.2.8.5 1.1.8.3-.3.7-.6 1.1-.8.4-.2.9-.3 1.4-.3.5 0 .9.1 1.3.3.4.2.8.4 1 .7.3.3.5.7.7 1.1.2.4.3.8.3 1.3v4.3h-1.7v-4.3c0-.2 0-.4-.1-.6-.1-.2-.2-.4-.3-.5-.1-.1-.3-.3-.5-.3-.2-.1-.4-.1-.6-.1-.2 0-.4 0-.6.1-.2.1-.4.2-.5.3-.1.1-.3.3-.3.5-.1.2-.1.4-.1.6v4.3H139v-4.3c0-.2 0-.4-.1-.6-.1-.2-.2-.4-.3-.5-.1-.1-.3-.3-.5-.3-.2-.1-.4-.1-.6-.1s-.4 0-.6.1c-.2.1-.4.2-.5.4-.1.2-.3.3-.3.5-.1.2-.1.4-.1.6v4.3h-1.7v-7.4z'
            />
          </svg>
        </div>
      )}
      <div className='d-flex align-items-center'>
        <div className='dropdown'>
          <a
            className='doc-profile mx-auto dropdown-toggle d-block '
            href=''
            id='top-profile-menu'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            <img src='/img/doc-profile.png' />
          </a>
          <ul className='dropdown-menu py-0' aria-labelledby='top-profile-menu'>
            {isDRSUser ? (
              <li>
                <div
                  className='dropdown-item'
                  onClick={() => handleUserProfile('Profile')}
                  style={{ cursor: 'pointer' }}
                >
                  <p className='notification-msg'>Profile</p>
                </div>
              </li>
            ) : (
              <li>
                <div
                  className='dropdown-item'
                  onClick={() => handleUserProfile('Clinic')}
                  style={{ cursor: 'pointer' }}
                >
                  <p className='notification-msg'>Profile</p>
                </div>
              </li>
            )}
            <li>
              <div
                className='dropdown-item'
                onClick={handleLogout}
                style={{ cursor: 'pointer' }}
              >
                <p className='notification-msg'>Log out</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};