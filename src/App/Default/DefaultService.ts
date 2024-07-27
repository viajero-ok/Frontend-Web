import API from "../BackendApi";

export const getApi = (): Promise<void> => {
  return API.get(`/api`);
};
