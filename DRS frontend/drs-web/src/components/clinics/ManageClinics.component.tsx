import { FC, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clinicTableOptionsConfig, getColumns } from '../../consts/clinic';
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import { useDeleteClinic, useGetClinics } from '../../controllers/clinic';
import { IClinic } from '../../interfaces/controllers/clinic';
import { CreateClinicModal, UpdateClinicModal } from '../../modals/clinic';
import DeleteModal from '../../modals/common/DeleteModal.modal';
import UiPaths from '../../paths/uiPaths';
import CommonDataTable from '../common/CommonDataTable.component';

export const ManageClinics: FC = () => {
  const navigate = useNavigate();

  const [pageNo, setPageNo] = useState<number>(initialPageNo);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [searchData, setSearchData] = useState<string>('');

  const { clinics, isLoading } = useGetClinics({
    pageNo: pageNo,
    pageSize: pageSize,
    searchData,
  });

  const { mutateDeleteClinic } = useDeleteClinic({
    pageNo,
    pageSize,
    totalCount: clinics?.body.totalCount!,
    setPageNo,
  });

  // component states
  const [selectedClinic, setselectedClinic] = useState<IClinic>();
  const [selectedClinicId, setselectedClinicId] = useState<number>();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const columns = getColumns({
    setShowUpdateModal,
    setShowDeleteModal,
    setselectedClinic,
    setselectedClinicId,
  });

  const handleRowClick = (row: IClinic) => {
    navigate(`${UiPaths.Clinics}/${row.id}`);
  };

  return (
    <Fragment>
      <CommonDataTable<IClinic>
        columns={columns}
        data={clinics?.body.data}
        totalCount={clinics?.body.totalCount}
        progressPending={isLoading}
        tableTitle='Manage Clinics'
        pageNo={pageNo}
        setPageNo={setPageNo}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setSearchData={setSearchData}
        tableOptionsConfig={clinicTableOptionsConfig}
        handleRowClick={handleRowClick}
        createButton={
          <a
            onClick={() => setShowCreateModal(true)}
            href='#'
            className='btn btn-site-primary mb-md-0 mb-3'
            data-bs-toggle='modal'
            data-bs-target='#exampleModal2'
          >
            Add New Clinic
          </a>
        }
      />

      {/* component modals */}
      {showUpdateModal && (
        <UpdateClinicModal
          pageNo={pageNo}
          pageSize={pageSize}
          selectedClinic={selectedClinic!}
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      {showCreateModal && (
        <CreateClinicModal
          pageSize={pageSize}
          setPageNo={setPageNo}
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
        />
      )}

      {showDeleteModal && (
        <DeleteModal<IClinic>
          handleDelete={mutateDeleteClinic}
          id={selectedClinicId!}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </Fragment>
  );
};
