import { Dispatch, SetStateAction } from 'react';

export interface ICreateModalProps {
  pageSize?: number;
  setPageNo?: React.Dispatch<React.SetStateAction<number>>;
  showCreateModal: boolean;
  setShowCreateModal: Dispatch<SetStateAction<boolean>>;
}
