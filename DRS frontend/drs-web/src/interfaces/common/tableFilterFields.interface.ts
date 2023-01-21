import { Dispatch, SetStateAction } from 'react';
import { OptionalObjectSchema } from 'yup/lib/object';
import { IOption } from './selectOption.interface';

export interface ITableFilterFields {
  type: 'select' | 'input';
  label: string;
  name: string;
  options?: IOption[];
}

export interface ITableFilterProps<TFilterData extends object> {
  filterFields: ITableFilterFields[];
  filterValidationSchema: OptionalObjectSchema<{}>;
  setFilterData: Dispatch<SetStateAction<TFilterData>>;
  setPageNo: Dispatch<SetStateAction<number>>;
}

export interface IFormInput {
  [key: string]: string | { label: string; value: string };
}
