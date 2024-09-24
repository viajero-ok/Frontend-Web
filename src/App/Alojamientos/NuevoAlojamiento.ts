import AUTH_API from "../AuthBackendApi";

export const getDatosDeRegistroNuevoAlojamiento = async () =>
  await AUTH_API.get(`/alojamientos/datos-registro-alojamiento`);
