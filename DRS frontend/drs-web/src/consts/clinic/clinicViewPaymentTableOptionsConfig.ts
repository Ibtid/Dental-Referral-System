import { ICommonTableOptionsConfig } from '../../interfaces/common';

export const clinicViewPaymentTableOptionsConfig: ICommonTableOptionsConfig = {
  exportOptions: {
    isCsvExport: false,
    isExcelExport: false,
    isPdfExport: false,
  },
  isCreateButton: false,
  isFilter: false,
  isSearch: false,
  isSort: false,
  isExtraOptions: false,
  enableRowClick: false,
};
