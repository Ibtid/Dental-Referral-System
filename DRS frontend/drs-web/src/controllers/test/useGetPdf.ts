import { useReactQuery } from "../../core/reactQuery";
import { IAxiosResponse } from "../../interfaces/axios";
import { IExportResponse } from "../../interfaces/common";
import ApiPaths from "../../paths/apiPaths";

export const useGetPdf = () => {
  const { refetch } = useReactQuery<IAxiosResponse<IExportResponse>>(
    [{ queryPath: ApiPaths.Test.GetPdf, enableAbort: true }],
    { enabled: false, cacheTime: 0 }
  );

  return { refetchGetPdf: refetch };
};
