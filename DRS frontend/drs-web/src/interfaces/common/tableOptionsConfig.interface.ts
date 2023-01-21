interface IExportOptions {
  isPdfExport: boolean;
  isExcelExport: boolean;
  isCsvExport: boolean;
}

export interface ICommonTableOptionsConfig {
  isCreateButton: boolean;
  isSearch: boolean;
  isSort: boolean;
  isFilter: boolean;
  isExtraOptions: boolean;
  exportOptions: IExportOptions;
  enableRowClick: boolean;
}
