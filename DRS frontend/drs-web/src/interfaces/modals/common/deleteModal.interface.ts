import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { UseMutateFunction } from 'react-query';
import { IAxiosResponse } from '../../axios';

export interface IDeleteModalProps<TResponse> {
  handleDelete: UseMutateFunction<
    IAxiosResponse<TResponse>,
    AxiosError,
    { id: number }
  >;
  id: number;
  showDeleteModal: boolean;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}
