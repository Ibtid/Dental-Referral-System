import { ITableSortData } from './tableSortData.interface';

export interface ICommonTableQueryHookParams<TFilterData extends object = {}> {
  pageNo: number;
  pageSize: number;
  searchData?: string;
  sortData?: ITableSortData;
  filterData?: TFilterData;
}
