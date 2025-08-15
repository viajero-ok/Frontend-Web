import AUTH_API from "../AuthBackendApi";

export const obtenerDatosRegistroPublicacion = async (idOferta: string) =>
  await AUTH_API.get(
    `/publicaciones/alojamientos/datos-publicacion-alojamiento/${idOferta}`
  );

export const obtenerDatosRegistroPublicacionActividad = async (idOferta: string) =>
  await AUTH_API.get(
    `/publicaciones/actividades/datos-publicacion-actividad/${idOferta}`
  );

export type TBodyCrearTarifa = {
  fecha_desde: string;
  fecha_hasta: string;
  id_oferta: string;
  id_tipo_detalle: string;
  id_tipo_pension: number;
  monto_tarifa: number;
};
export const crearTarifa = async (body: TBodyCrearTarifa) =>
  await AUTH_API.post(`/publicaciones/alojamientos/registrar-tarifa`, body);

export type TBodyActualizarTarifa = {
  fecha_desde: string;
  fecha_hasta: string;
  id_oferta: string;
  id_tipo_detalle: string;
  id_tarifa: number;
  id_tipo_pension: number;
  monto_tarifa: number;
};
export const actualizarTarifa = async (body: TBodyActualizarTarifa) =>
  await AUTH_API.patch(`/publicaciones/alojamientos/actualizar-tarifa`, body);

export const obtenerTarifas = async (idOferta: string) =>
  await AUTH_API.get(
    `/publicaciones/alojamientos/obtener-datos-registrados-tarifa/${idOferta}`
  );

export const eliminarTarifa = async (idTarifa: number) =>
  await AUTH_API.delete(
    `/publicaciones/alojamientos/eliminar-tarifa/${idTarifa}`
  );

export const publicarAlojamiento = async (idOferta: string) =>
  await AUTH_API.post(`/publicaciones/alojamientos/publicar-alojamiento/${idOferta}
`);

export const obtenerDatosRegistradosPublicacion = async (idOferta: string) =>
  await AUTH_API.get(
    `/publicaciones/alojamientos/obtener-datos-registrados-tarifa/${idOferta}`
  );
