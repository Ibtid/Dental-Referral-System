import { IClinic } from '../../controllers/clinic';

export interface IFindClinic {
  searchData: string | undefined;

  setSearchData: React.Dispatch<
    React.SetStateAction<{
      patient: string;
      clinic: string;
    }>
  >;
  selectedClinic: IClinic | undefined;
  setSelectedClinic: React.Dispatch<React.SetStateAction<IClinic | undefined>>;
}
