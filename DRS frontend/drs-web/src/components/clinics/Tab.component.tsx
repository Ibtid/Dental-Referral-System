import { FC } from 'react';

interface ITab {
  setTabNavigation: React.Dispatch<React.SetStateAction<string>>;
}

export const Tab: FC<ITab> = ({ setTabNavigation }: ITab) => {
  return (
    <ul
      className='nav nav-pills mb-4 px-3 clinicViewTabs'
      id='myTab'
      role='tablist'>
      <li className='nav-item me-3' role='presentation'>
        <button
          onClick={() => setTabNavigation('patient')}
          className='nav-link active rounded-pill'
          id='home-tab'
          data-bs-toggle='tab'
          // data-bs-toggle='pill'
          data-bs-target='#home'
          type='button'
          role='tab'
          aria-controls='home'
          aria-selected='true'>
          Patient List
        </button>
      </li>
      <li className='nav-item me-3' role='presentation'>
        <button
          onClick={() => setTabNavigation('payment')}
          className='nav-link rounded-pill'
          id='profile-tab'
          data-bs-toggle='tab'
          // data-bs-toggle='pill'
          data-bs-target='#profile'
          type='button'
          role='tab'
          aria-controls='profile'
          aria-selected='false'>
          Payment
        </button>
      </li>

      <li className='nav-item me-3' role='presentation'>
        <button
          onClick={() => setTabNavigation('lineChart')}
          className='nav-link rounded-pill'
          id='settings-tab'
          data-bs-toggle='tab'
          // data-bs-toggle='pill'
          data-bs-target='#settings'
          type='button'
          role='tab'
          aria-controls='settings'
          aria-selected='false'>
          InfoGraph
        </button>
      </li>
    </ul>
  );
};
