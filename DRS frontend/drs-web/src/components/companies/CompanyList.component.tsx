import { FC, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { companyTableOptionsConfig, getColumns } from '../../consts/company';
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import { useDeleteCompany, useGetCompany } from '../../controllers/company';
import { ICompany } from '../../interfaces/controllers/company';
import DeleteModal from '../../modals/common/DeleteModal.modal';
import { CreateCompanyModal, UpdateCompanyModal } from '../../modals/company';
import UiPaths from '../../paths/uiPaths';
import CommonDataTable from '../common/CommonDataTable.component';

export const CompanyList: FC = () => {
  const navigate = useNavigate();

  const [pageNo, setPageNo] = useState<number>(initialPageNo);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchData, setSearchData] = useState<string>('');

  const { companies, isLoading } = useGetCompany({
    pageNo: pageNo,
    pageSize: pageSize,
    searchData,
  });

  // component states
  const [selectedCompany, setselectedCompany] = useState<ICompany>();
  const [selectedCompanyId, setselectedCompanyId] = useState<number>();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const { mutateDeleteCompany } = useDeleteCompany({
    pageNo,
    setPageNo,
    totalCount: companies?.body.totalCount!,
    pageSize,
  });

  const columns = getColumns({
    setShowUpdateModal,
    setShowDeleteModal,
    setselectedCompany,
    setselectedCompanyId,
  });

  const handleRowClick = (row: ICompany) => {
    navigate(`${UiPaths.Companies}/${row.id}`);
  };

  return (
    <Fragment>
      <CommonDataTable<ICompany>
        columns={columns}
        data={companies?.body.data}
        totalCount={companies?.body.totalCount}
        progressPending={isLoading}
        tableTitle='Company Management'
        pageNo={pageNo}
        setPageNo={setPageNo}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setSearchData={setSearchData}
        tableOptionsConfig={companyTableOptionsConfig}
        handleRowClick={handleRowClick}
        createButton={
          <a
            onClick={() => setShowCreateModal(true)}
            href='#'
            className='btn btn-site-primary mb-md-0 mb-3'
            data-bs-toggle='modal'
            data-bs-target='#exampleModal2'
          >
            Add New Company
          </a>
        }
      />

      {showUpdateModal && (
        <UpdateCompanyModal
          pageNo={pageNo}
          pageSize={pageSize}
          selectedCompany={selectedCompany!}
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      {showCreateModal && (
        <CreateCompanyModal
          pageSize={pageSize}
          setPageNo={setPageNo}
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
        />
      )}

      {showDeleteModal && (
        <DeleteModal<ICompany>
          handleDelete={mutateDeleteCompany}
          id={selectedCompanyId!}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </Fragment>
  );
};
