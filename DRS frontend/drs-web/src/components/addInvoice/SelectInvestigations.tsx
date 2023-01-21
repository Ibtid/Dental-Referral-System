import { FC } from 'react';
import { initialPageNo } from '../../consts/initialPageDetails';
import { useGetInvestigations } from '../../controllers/investigations';
import { ISelectInvestigation } from '../../interfaces/components/addInvoice';
import { IInvestigation } from '../../interfaces/controllers/investigations';

export const SelectInvestigations: FC<ISelectInvestigation> = ({
  selectedInvestigations,
  setSelectedInvestigations,
  manualErrors,
  setManualErrors,
}: ISelectInvestigation) => {
  const { investigations, isLoading } = useGetInvestigations({
    pageNo: initialPageNo,
    pageSize: 100,
  });

  const handleChange = (e: any, investigation: IInvestigation) => {
    e.preventDefault();
    let localSelectedInvestigations: IInvestigation[] = selectedInvestigations;

    const present: IInvestigation | undefined =
      localSelectedInvestigations?.find((localInvestigation) => {
        if (investigation.name === localInvestigation.name) {
          return true;
        }
        return false;
      });

    if (present) {
      localSelectedInvestigations = localSelectedInvestigations?.filter(
        (localInvestigation: IInvestigation) =>
          localInvestigation.name != investigation.name
      );
    } else {
      localSelectedInvestigations?.push(investigation);
    }
    setSelectedInvestigations([...localSelectedInvestigations]);
    setManualErrors(undefined);
  };

  return (
    <div className='card custom-b-radius p-4 mb-3'>
      <h3 className='mb-4'>Select Test(s)</h3>
      <div
        className='row'
        role='group'
        aria-label='Basic checkbox toggle button group'>
        {investigations?.body.data.map(
          (investigation: IInvestigation, index: number) => (
            <div
              className='col-md-4 col-12 mb-3'
              key={index}
              onClick={(e) => {
                handleChange(e, investigation);
              }}>
              <input
                type='checkbox'
                className='btn-check'
                id={`btncheck${index}`}
                autoComplete='off'
              />
              <label
                className={`d-grid gap-2 btn ${
                  selectedInvestigations.indexOf(investigation) === -1
                    ? 'btn-outline-primary'
                    : 'btn-primary'
                } py-3 fw-bold`}
                htmlFor={`btncheck${index}`}>
                {investigation.name}
              </label>
            </div>
          )
        )}
      </div>
      <small className='text-danger'>{manualErrors}</small>
    </div>
  );
};
