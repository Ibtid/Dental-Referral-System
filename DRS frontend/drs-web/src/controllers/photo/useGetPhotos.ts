import { useReactQuery } from "../../core/reactQuery";
import { IPhoto } from "../../interfaces/controllers/photo";
import ApiPaths from "../../paths/apiPaths";

export const useGetPhotos = (isOpen: boolean) => {
  const { data } = useReactQuery<IPhoto[]>(
    [{ queryPath: ApiPaths.Photo.GetAll }],
    {
      enabled: isOpen,
    }
  );

  return { photos: data };
};
