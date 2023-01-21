import { AxiosError } from 'axios';
import { RefetchOptions, UseQueryResult } from 'react-query';
import { TContentType } from '../../types/utils/base64ToBlob';
import { IAxiosResponse } from '../axios';

export interface IExportResponse {
  base64: string;
  mimeType: string;
}

export interface IExportDetails {
  refetch(
    options: RefetchOptions
  ): Promise<UseQueryResult<IAxiosResponse<IExportResponse>, AxiosError>>;
  contentType: TContentType;
  downloadAs: string;
}
