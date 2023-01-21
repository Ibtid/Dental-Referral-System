import { FC, Fragment, useState } from 'react';
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import { manageInvoiceTableOptionsConfig } from '../../consts/invoice/tableOptionsConfig';
import {
  useGetManageInvoiceData,
  useInvoiceDownloadFile,
  usePrintInvoice,
} from '../../controllers/invoice';
import { IManageInvoice } from '../../interfaces/controllers/invoice';
import CommonDataTable from '../common/CommonDataTable.component';
import { useNavigate } from 'react-router-dom';
import UiPaths from '../../paths/uiPaths';
import { getColumns } from '../../consts/invoice';

export const ManageInvoices: FC = () => {
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState<number>(initialPageNo);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchData, setSearchData] = useState<string>('');
  const [selectedInvestigationId, setselectedInvestigationId] =
    useState<number>();
  const [selectedInvoiceId, setselectedInvoiceId] = useState<number>();

  const { invoices, isLoading } = useGetManageInvoiceData({
    pageNo: pageNo,
    pageSize: pageSize,
    searchData,
  });

  const { isLoadingInvoiceDownload } = useInvoiceDownloadFile(
    selectedInvestigationId!,
    setselectedInvestigationId
  );

  const { isLoadingInvoicePrint } = usePrintInvoice(
    selectedInvoiceId!,
    setselectedInvoiceId
  );

  const columns = getColumns({
    selectedInvestigationId: selectedInvestigationId!,
    selectedInvoiceId: selectedInvoiceId!,
    setselectedInvestigationId,
    setselectedInvoiceId,
    isLoadingInvoiceDownload,
    isLoadingInvoicePrint,
  });

  const handleRowClick = (row: IManageInvoice) => {
    navigate(`${UiPaths.Invoices}/${row.id}`);
  };

  return (
    <Fragment>
      <CommonDataTable<IManageInvoice>
        columns={columns}
        data={invoices?.body.data}
        totalCount={invoices?.body.totalCount}
        progressPending={isLoading}
        tableTitle='Invoices'
        pageNo={pageNo}
        setPageNo={setPageNo}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setSearchData={setSearchData}
        tableOptionsConfig={manageInvoiceTableOptionsConfig}
        handleRowClick={handleRowClick}
        createButton={
          <a
            onClick={() => {
              navigate(UiPaths.AddInvoice());
            }}
            href='#'
            className='btn btn-site-primary mb-md-0 mb-3'
            data-bs-toggle='modal'
            data-bs-target='#exampleModal2'
          >
            Add Invoice
          </a>
        }
      />
    </Fragment>
  );
};
