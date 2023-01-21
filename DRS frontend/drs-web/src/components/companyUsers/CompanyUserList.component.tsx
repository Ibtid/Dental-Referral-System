import { FC, Fragment, useState } from 'react';
import {
  companyUserTableOptionsConfig,
  getColumns,
} from '../../consts/companyUser';
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import { useGetCompanyUser } from '../../controllers/companyUser';
import { useDeleteCompanyUser } from '../../controllers/companyUser';
import { ICompanyUser } from '../../interfaces/controllers/companyUser';
import DeleteModal from '../../modals/common/DeleteModal.modal';
import {
  CreateCompanyUserModal,
  UpdateCompanyUserModal,
} from '../../modals/companyUser';
import CommonDataTable from '../common/CommonDataTable.component';

export const CompanyUserList: FC = () => {
  const [pageNo, setPageNo] = useState<number>(initialPageNo);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchData, setSearchData] = useState<string>('');

  const { companyUsers, isLoading } = useGetCompanyUser({
    pageNo: pageNo,
    pageSize: pageSize,
    searchData,
  });

  // component states
  const [selectedCompanyUser, setselectedCompanyUser] =
    useState<ICompanyUser>();
  const [selectedCompanyUserId, setselectedCompanyUserId] = useState<number>();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const { mutateDeleteCompanyUser } = useDeleteCompanyUser({
    pageNo,
    pageSize,
    totalCount: companyUsers?.body.totalCount!,
    setPageNo,
  });

  const columns = getColumns({
    setShowUpdateModal,
    setShowDeleteModal,
    setselectedCompanyUser,
    setselectedCompanyUserId,
  });

  return (
    <Fragment>
      <CommonDataTable<ICompanyUser>
        columns={columns}
        data={companyUsers?.body.data}
        totalCount={companyUsers?.body.totalCount}
        progressPending={isLoading}
        tableTitle='Company Users'
        pageNo={pageNo}
        setPageNo={setPageNo}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setSearchData={setSearchData}
        tableOptionsConfig={companyUserTableOptionsConfig}
        createButton={
          <a
            onClick={() => setShowCreateModal(true)}
            href='#'
            className='btn btn-site-primary mb-md-0 mb-3'
            data-bs-toggle='modal'
            data-bs-target='#exampleModal2'>
            Add New User
          </a>
        }
      />

      {showDeleteModal && (
        <DeleteModal<ICompanyUser>
          handleDelete={mutateDeleteCompanyUser}
          id={selectedCompanyUserId!}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {showUpdateModal && (
        <UpdateCompanyUserModal
          pageNo={pageNo}
          pageSize={pageSize}
          selectedCompanyUser={selectedCompanyUser!}
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      {showCreateModal && (
        <CreateCompanyUserModal
          pageSize={pageSize}
          setPageNo={setPageNo}
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
        />
      )}
    </Fragment>
  );
};
