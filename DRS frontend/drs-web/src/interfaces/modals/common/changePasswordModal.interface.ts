import { Dispatch, SetStateAction } from 'react';

export interface IChangePasswordModalProps {
  showCreateModal: boolean;
  setShowCreateModal: Dispatch<SetStateAction<boolean>>;
}
