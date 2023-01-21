import {
  Dispatch,
  ReactNode,
  SetStateAction,
  MouseEvent as ReactMouseEvent,
} from 'react';
import { TableColumn } from 'react-data-table-component';
import { OptionalObjectSchema } from 'yup/lib/object';
import { IExportDetails } from './exportDetails.interface';
import { ITableFilterFields } from './tableFilterFields.interface';
import { ICommonTableOptionsConfig } from './tableOptionsConfig.interface';
import { ITableSortData } from './tableSortData.interface';

export interface ICommonDataTableParams<
  TData extends object,
  TFilterData extends object
> {
  columns: TableColumn<TData>[];
  data: TData[] | undefined;
  totalCount: number | undefined;
  progressPending: boolean;
  tableTitle: string;
  pageNo: number;
  setPageNo: Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<React.SetStateAction<number>>;
  tableOptionsConfig: ICommonTableOptionsConfig;
  handleRowClick?: (
    row: TData,
    event: ReactMouseEvent<Element, MouseEvent>
  ) => void;
  createButton?: ReactNode;
  setSearchData?: Dispatch<React.SetStateAction<string>>;
  setSortData?: Dispatch<SetStateAction<ITableSortData>>;
  setFilterData?: Dispatch<SetStateAction<TFilterData>>;
  filterFields?: ITableFilterFields[];
  filterValidationSchema?: OptionalObjectSchema<{}>;
  exportDetails?: IExportDetails;
}

MouseEvent;
