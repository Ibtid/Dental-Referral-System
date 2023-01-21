import { IInvestigation } from '../../controllers/investigations';

export interface ISelectInvestigation {
  selectedInvestigations: IInvestigation[];
  setSelectedInvestigations: React.Dispatch<
    React.SetStateAction<IInvestigation[]>
  >;
  manualErrors: string | undefined;
  setManualErrors: React.Dispatch<
    React.SetStateAction<
      | {
          patient?: string;
          investigation?: string;
        }
      | undefined
    >
  >;
}
