import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IDownloadPatientReportData } from '../../interfaces/controllers/patient';
import ApiPaths from '../../paths/apiPaths';

export const useDownloadPatientReport = (id: number) => {
  const { data, refetch } = useReactQuery<
    IAxiosResponse<IDownloadPatientReportData>
  >([{ queryPath: ApiPaths.Patient.DownloadReport(id), isPrivate: false }], {
    enabled: false,
  });

  return { base64: data, refetch };
};
