import API from "../BackendApi";

export const getDatosDeRegistro = async () => {
  return await API.get(`/auth/datos-registro`);
};
