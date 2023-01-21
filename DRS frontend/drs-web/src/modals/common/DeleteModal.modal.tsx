import { Fragment, PropsWithChildren, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { IDeleteModalProps } from '../../interfaces/modals/common';

const DeleteModal = <TResponse extends object>({
  handleDelete,
  id,
  showDeleteModal,
  setShowDeleteModal,
}: PropsWithChildren<IDeleteModalProps<TResponse>>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteHandler = () => {
    setIsLoading(true);
    handleDelete(
      { id: id },
      {
        onSuccess: () => setShowDeleteModal(false),
        onSettled: () => setIsLoading(false),
      }
    );
  };

  return (
    <Fragment>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Fragment>
          <Modal.Body>Do you want to delete?</Modal.Body>
          <Modal.Footer>
            <button
              type='button'
              className='btn cta-outline'
              onClick={() => setShowDeleteModal(false)}
            >
              Close
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={deleteHandler}
              disabled={isLoading}
            >
              {isLoading && (
                <span
                  className='spinner-border spinner-border-sm mx-3'
                  role='status'
                  aria-hidden='true'
                ></span>
              )}
              Delete
            </button>
          </Modal.Footer>
        </Fragment>
      </Modal>
    </Fragment>
  );
};

export default DeleteModal;
