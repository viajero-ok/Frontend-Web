import AUTH_API from "../AuthBackendApi";

export const obtenerOfertasPorPrestador = async () =>
  await AUTH_API.get(`ofertas-turisticas/por-prestador`);

export const eliminarOferta = async (idOferta: number) =>
  await AUTH_API.delete(`/alojamientos/eliminar-alojamiento/${idOferta}`);

//&id_tipo_oferta=2&id_establecimiento=4&nombre_oferta=Hotel%20de%20Montaña&id_provincia=7&id_departamento=12&id_localidad=25&min_monto_garantia=100&max_monto_garantia=500&min_dias_estadia=3
export const consultarOfertasTurista = async () =>
  await AUTH_API.get(
    `/ofertas-turisticas/obtener-ofertas-turisticas?pagina=1&limite=10`
  );
