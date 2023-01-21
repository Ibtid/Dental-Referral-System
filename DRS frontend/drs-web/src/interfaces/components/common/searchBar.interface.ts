import { Dispatch, SetStateAction } from 'react';
import { OptionalObjectSchema } from 'yup/lib/object';
import {
  ICommonTableOptionsConfig,
  IExportDetails,
  ITableFilterFields,
} from '../../common';

export interface ISearchBar<TFilterData extends object> {
  tableOptionsConfig: ICommonTableOptionsConfig;
  setSearchData?: Dispatch<SetStateAction<string>>;
  setPageNo?: Dispatch<SetStateAction<number>>;
  setFilterData?: Dispatch<SetStateAction<TFilterData>>;
  filterFields?: ITableFilterFields[];
  filterValidationSchema?: OptionalObjectSchema<{}>;
  exportDetails?: IExportDetails;
}
