import API from "../BackendApi";

export const getDatosDeRegistro = async (perfil?: "turista" | "prestador") => {
  return await API.get(`/auth/datos-registro?perfil=${perfil ?? "prestador"}`);
};
