import axiosRequests from "../helpers/axiosRequests";
import { axiosPublicInstance } from "../instances";

export const usePublicAxios = () => {
  const {
    getRequest: publicGet,
    postRequest: publicPost,
    putRequest: publicPut,
    patchRequest: publicPatch,
    deleteRequest: publicDelete,
  } = axiosRequests(axiosPublicInstance);

  return { publicGet, publicPost, publicPut, publicPatch, publicDelete };
};
