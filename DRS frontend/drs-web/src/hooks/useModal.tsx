import { FC, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { IChildrenComponent } from '../interfaces/common';

// which component use this hook will re-render
// when the state of this hook change
// so use wisely, as minimal render as possible

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const RenderedModal: FC<IChildrenComponent> = ({ children }) => {
    if (isOpen) {
      return (
        <Modal show={isOpen} onHide={close} centered>
          {children}
        </Modal>
      );
    }
    return null;
  };

  return { isOpen, open, close, RenderedModal };
};

export default useModal;
