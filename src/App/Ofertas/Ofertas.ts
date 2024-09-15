import AUTH_API from "../AuthBackendApi";

export const obtenerOfertasPorPrestador = async () =>
  await AUTH_API.get(`ofertas-turisticas/por-prestador`);
