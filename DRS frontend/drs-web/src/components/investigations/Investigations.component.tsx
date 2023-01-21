import { FC, Fragment, useState } from 'react';

import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import {
  getColumns,
  investigationTableOptionsConfig,
} from '../../consts/investigation';
import {
  useGetInvestigations,
  useDeleteInvestigation,
} from '../../controllers/investigations';
import { IInvestigation } from '../../interfaces/controllers/investigations';
import DeleteModal from '../../modals/common/DeleteModal.modal';
import {
  CreateInvestigationModal,
  UpdateInvestigationModal,
} from '../../modals/investigation';
import CommonDataTable from '../common/CommonDataTable.component';

export const ManageInvestigations: FC = () => {
  const [pageNo, setPageNo] = useState<number>(initialPageNo);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchData, setSearchData] = useState<string>('');

  const { investigations, isLoading } = useGetInvestigations({
    pageNo: pageNo,
    pageSize: pageSize,
    searchData,
  });

  const { mutateDeleteInvestigation } = useDeleteInvestigation({
    pageNo,
    pageSize,
    totalCount: investigations?.body.totalCount!,
    setPageNo,
  });

  // component states
  const [selectedInvestigation, setselectedInvestigation] =
    useState<IInvestigation>();
  const [selectedInvestigationId, setselectedInvestigationId] =
    useState<number>();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const columns = getColumns({
    setShowUpdateModal,
    setShowDeleteModal,
    setselectedInvestigation,
    setselectedInvestigationId,
  });

  return (
    <Fragment>
      <CommonDataTable<IInvestigation>
        columns={columns}
        data={investigations?.body.data}
        totalCount={investigations?.body.totalCount}
        progressPending={isLoading}
        tableTitle='Manage Investigations'
        pageNo={pageNo}
        setSearchData={setSearchData}
        setPageNo={setPageNo}
        pageSize={pageSize}
        setPageSize={setPageSize}
        tableOptionsConfig={investigationTableOptionsConfig}
        createButton={
          <a
            onClick={() => setShowCreateModal(true)}
            href='#'
            className='btn btn-site-primary mb-md-0 mb-3'
            data-bs-toggle='modal'
            data-bs-target='#exampleModal2'>
            Add New Investigations
          </a>
        }
      />

      {/* component modals */}
      {showUpdateModal && (
        <UpdateInvestigationModal
          pageNo={pageNo}
          pageSize={pageSize}
          selectedInvestigation={selectedInvestigation!}
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      {showCreateModal && (
        <CreateInvestigationModal
          pageSize={pageSize}
          setPageNo={setPageNo}
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
        />
      )}

      {showDeleteModal && (
        <DeleteModal<IInvestigation>
          handleDelete={mutateDeleteInvestigation}
          id={selectedInvestigationId!}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </Fragment>
  );
};
