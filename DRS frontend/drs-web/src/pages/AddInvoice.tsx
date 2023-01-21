import { yupResolver } from '@hookform/resolvers/yup';
import { FC, Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Amount,
  FindClinic,
  FindPatient,
  Header,
  PaymentInfo,
  SelectInvestigations,
} from '../components/addInvoice';
import { createPostValidationSchema } from '../consts/invoice';
import { usePostInvoice } from '../controllers/invoice';
import { IClinic } from '../interfaces/controllers/clinic';
import { IInvestigation } from '../interfaces/controllers/investigations';
import { IInvoiceCreatePostPayload } from '../interfaces/controllers/invoice';
import { IPatient } from '../interfaces/controllers/patient';
import { SuccessMessageModalForAddInvoice } from '../modals/invoice';

const AddInvoicePage: FC = () => {
  const [selectedInvestigations, setSelectedInvestigations] = useState<
    IInvestigation[]
  >([]);
  const [selectedPatient, setSelectedPatient] = useState<
    IPatient | undefined
  >();
  const [selectedClinic, setSelectedClinic] = useState<IClinic | undefined>();
  const [selectedClinicName, setSelectedClinicName] = useState<
    string | undefined
  >();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [manualErrors, setManualErrors] = useState<{
    patient?: string;
    investigation?: string;
    paid?: string;
  }>();

  const [searchData, setSearchData] = useState<{
    patient: string;
    clinic: string;
  }>({ patient: '', clinic: '' });

  const [formData, setFormData] = useState<{ discount: number; paid: number }>({
    discount: 0,
    paid: 0,
  });

  const [base64, setBase64] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IInvoiceCreatePostPayload>({
    resolver: yupResolver(createPostValidationSchema),
  });

  const { mutatePostInvoice, isLoading } = usePostInvoice(
    setShowModal,
    setBase64
  );

  const createInvoice: SubmitHandler<Omit<IInvoiceCreatePostPayload, 'id'>> = (
    data
  ) => {
    //Validations
    if (selectedInvestigations.length == 0) {
      setManualErrors({ ...manualErrors, investigation: 'Required' });
    }
    if (!selectedPatient) {
      setManualErrors({ ...manualErrors, patient: 'Required' });
    }
    let total: number = selectedInvestigations.reduce(
      (accumulator, investigation) => {
        return accumulator + Number(investigation.cost);
      },
      0
    );

    if (data.paid > total - total * (data.discount / 100)) {
      setManualErrors({
        ...manualErrors,
        paid: 'Cannot pay more than required amount',
      });
    }

    //Submission
    if (
      selectedInvestigations.length != 0 &&
      selectedPatient &&
      data.paid < total - total * (data.discount / 100)
    ) {
      mutatePostInvoice({
        ...data,
        // deliveryTime: new Date(data.deliveryTime),
        patientId: selectedPatient?.id,
        clinicId: selectedClinic?.id,
        investigation: selectedInvestigations.map(
          (investigation) => investigation.id
        ),
      });
      reset();
      setSelectedClinicName(selectedClinic?.name);
      setSelectedClinic(undefined);
      setSelectedInvestigations([]);
      setSelectedPatient(undefined);
      setSearchData({ patient: '', clinic: '' });
      setFormData({ discount: 0, paid: 0 });
    }
  };

  return (
    <Fragment>
      <form
        className='mainBody new-diagnostic-block  px-3 py-3 mt-2'
        onSubmit={handleSubmit(createInvoice)}>
        <div className='patients-survey d-flex flex-column p-3'>
          <Header isLoading={isLoading} />
          <div className='container py-3'>
            <div className='col-10 mx-auto'>
              <FindPatient
                searchData={searchData.patient}
                setSearchData={setSearchData}
                setSelectedPatient={setSelectedPatient}
                manualErrors={manualErrors?.patient}
                setManualErrors={setManualErrors}
              />
              <FindClinic
                searchData={searchData.clinic}
                setSearchData={setSearchData}
                selectedClinic={selectedClinic}
                setSelectedClinic={setSelectedClinic}
              />
              <SelectInvestigations
                selectedInvestigations={selectedInvestigations}
                setSelectedInvestigations={setSelectedInvestigations}
                manualErrors={manualErrors?.investigation}
                setManualErrors={setManualErrors}
              />
              <Amount
                selectedInvestigations={selectedInvestigations}
                formData={formData}
                setFormData={setFormData}
                register={register}
                errors={errors}
              />
              <PaymentInfo
                register={register}
                errors={errors}
                control={control}
              />
            </div>
          </div>
        </div>
      </form>
      {showModal && (
        <SuccessMessageModalForAddInvoice
          base64={base64}
          setBase64={setBase64}
          selectedClinicName={selectedClinicName}
          setSelectedClinicName={setSelectedClinicName}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </Fragment>
  );
};

export default AddInvoicePage;
