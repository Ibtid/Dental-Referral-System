import { ICommonTableOptionsConfig } from '../../interfaces/common';

export const todaysReportTableOptionsConfig: ICommonTableOptionsConfig = {
  exportOptions: {
    isCsvExport: false,
    isExcelExport: false,
    isPdfExport: false,
  },
  isCreateButton: false,
  isFilter: false,
  isSearch: true,
  isSort: false,
  isExtraOptions: false,
  enableRowClick: false,
};
