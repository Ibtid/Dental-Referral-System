import { ICommonTableOptionsConfig } from '../../interfaces/common';

export const clinicTableOptionsConfig: ICommonTableOptionsConfig = {
  exportOptions: {
    isCsvExport: false,
    isExcelExport: false,
    isPdfExport: false,
  },
  isCreateButton: true,
  isFilter: false,
  isSearch: true,
  isSort: false,
  isExtraOptions: false,
  enableRowClick: true,
};
