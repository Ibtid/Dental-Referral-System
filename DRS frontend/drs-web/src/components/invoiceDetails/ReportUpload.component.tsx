import { FC, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetInvoiceById } from '../../controllers/invoice';
import { usePatchUploadInvoiceInvestigation } from '../../controllers/invoice/usePatchUploadInvoiceInvestigation';

interface IReportUpload {
  id: number;
  reportUploaded: boolean;
  name: string;
  cost: number;
}

export const ReportUpload: FC<IReportUpload> = ({
  id,
  reportUploaded,
  name,
  cost,
}: IReportUpload) => {
  const { invoiceId } = useParams();
  const { refetch } = useGetInvoiceById(parseInt(invoiceId!));
  const { mutatePatchUploadInvoiceInvestigation, isLoading } =
    usePatchUploadInvoiceInvestigation();
  const [file, setFile] = useState<Blob>();
  const [edit, setEdit] = useState<Boolean>(false);
  const onChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const Upload = () => {
    let data = new FormData();
    data.append('file', file!);

    mutatePatchUploadInvoiceInvestigation(
      {
        id,
        file: data.get('file') as Blob,
      },
      { onSuccess: () => refetch() }
    );
    setFile(undefined);
    setEdit(false);
  };

  return (
    <Fragment>
      <tbody>
        <tr key={id}>
          <td>{name}</td>
          <td>{cost}</td>
          <td>{reportUploaded === true ? 'Uploaded' : 'Not Uploaded'}</td>
          <td>
            {reportUploaded === true && !edit && (
              <button onClick={() => setEdit(true)}>Edit</button>
            )}
            {(reportUploaded === false || edit) && (
              <input
                type='file'
                className='form-control-file'
                onChange={(e) => onChangeFile(e)}
              />
            )}
            {file !== undefined && (
              <button className='mb-3 fw-light' onClick={Upload}>
                Upload
              </button>
            )}
          </td>
        </tr>
      </tbody>
    </Fragment>
  );
};
