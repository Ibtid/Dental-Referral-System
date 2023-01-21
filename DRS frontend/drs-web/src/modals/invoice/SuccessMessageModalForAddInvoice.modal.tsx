import { FC, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { ISuccessMessageModalForAddInvoice } from '../../interfaces/modals/invoice';
import { base64toBlobConverter, printBlob } from '../../utils/base64ToBlob';

export const SuccessMessageModalForAddInvoice: FC<
  ISuccessMessageModalForAddInvoice
> = ({
  base64,
  setBase64,
  selectedClinicName,
  setSelectedClinicName,
  showModal,
  setShowModal,
}) => {
  return (
    <Fragment>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSelectedClinicName(undefined);
        }}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Diagnostics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className='row col-12 m-3'>Your Data Entry was successfull</h2>

          {selectedClinicName && (
            <h2 className='row col-12 m-3'>
              We Notify {selectedClinicName} by sending a Confirmation SMS
            </h2>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type='button'
            className='btn cta-outline'
            onClick={() => {
              setBase64('');
              setShowModal(false);
              setSelectedClinicName(undefined);
            }}>
            Review
          </button>
          <button
            type='submit'
            className='btn btn-primary'
            onClick={() => {
              const blob = base64toBlobConverter(base64, 'application/pdf');
              setBase64('');
              printBlob(blob);
              setShowModal(false);
              setSelectedClinicName(undefined);
            }}>
            Save and print
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
