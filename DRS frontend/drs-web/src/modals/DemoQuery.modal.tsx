import { FC, Fragment } from "react";
import { useGetPhotos } from "../controllers/photo";
import useModal from "../hooks/useModal";
import { IDemoQueryModal } from "../interfaces/modals";

export const DemoQueryModal: FC<IDemoQueryModal> = ({ todos }) => {
  const { isOpen, open, close, RenderedModal } = useModal();

  const { photos } = useGetPhotos(isOpen);

  return (
    <Fragment>
      <button onClick={open}>Open Modal</button>

      <RenderedModal>
        <Fragment>
          <div>I am modal body!</div>
          <p>{todos?.length}</p>
          <p>{photos?.length}</p>
          <button onClick={close}>Close</button>
        </Fragment>
      </RenderedModal>
    </Fragment>
  );
};
