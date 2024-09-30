import AUTH_API from "../AuthBackendApi";

export const obtenerOfertasPorPrestador = async () =>
  await AUTH_API.get(`ofertas-turisticas/por-prestador`);

export const eliminarOferta = async (idOferta: number) =>
  await AUTH_API.delete(`/alojamientos/eliminar-alojamiento/${idOferta}`);
