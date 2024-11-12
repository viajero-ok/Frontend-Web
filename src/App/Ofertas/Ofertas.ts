import AUTH_API from "../AuthBackendApi";

export const obtenerOfertasPorPrestador = async () =>
  await AUTH_API.get(`ofertas-turisticas/por-prestador`);

export const eliminarOferta = async (idOferta: number) =>
  await AUTH_API.delete(`/alojamientos/eliminar-alojamiento/${idOferta}`);

//&id_tipo_oferta=2&id_establecimiento=4&nombre_oferta=Hotel%20de%20Montaña&id_provincia=7&id_departamento=12&id_localidad=25&min_monto_garantia=100&max_monto_garantia=500&min_dias_estadia=3
type TFiltros = {
  pagina: number;
  limite: number;
  id_tipo_oferta: number;
  id_sub_tipo_oferta?: number;
  id_localidad?: number;
  min_monto?: number;
  max_monto?: number;
  latitud?: string;
  longitud?: string;
  radio?: number;
  fecha_desde: string;
  fecha_hasta: string;
  cantidad_personas: number;
};
export const consultarOfertasTurista = async (filtros: TFiltros) => {
  const params = Object.entries(filtros)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return await AUTH_API.get(
    `/ofertas-turisticas/obtener-ofertas-turisticas?${params}`
  );
};

type TData = {
  id_oferta: string;
  fecha_desde: string;
  fecha_hasta: string;
  cantidad_personas: number;
};
export const obtenerOfertaTuristica = async (data: TData) => {
  return await AUTH_API.get(`/ofertas-turisticas/obtener-oferta-turistica`, {
    params: data,
  });
};

type TParamsObtenerResumenOferta = {
  id_oferta: string;
  id_detalle: string;
  fecha_desde: string;
  fecha_hasta: string;
  cantidad_personas: number;
};
export const obtenerResumenOferta = async (data: TParamsObtenerResumenOferta) =>
  await AUTH_API.get(`/ofertas-turisticas/obtener-resumen-oferta-turistica`, {
    params: data,
  });
