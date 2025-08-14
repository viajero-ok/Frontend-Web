import AUTH_API from "../AuthBackendApi";

export type TBodyCrearTarifaActividad = {
  fecha_desde: string;
  fecha_hasta: string;
  id_oferta: string;
  id_tipo_entrada: string;
  monto_tarifa: number;
};
export const crearTarifaActividad = async (body: TBodyCrearTarifaActividad) =>
  await AUTH_API.post(`/publicaciones/actividades/registrar-tarifa`, body);

export type TBodyActualizarTarifaActividad = {
  fecha_desde: string;
  fecha_hasta: string;
  id_oferta: string;
  id_tipo_entrada: string;
  id_tarifa: number;
  monto_tarifa: number;
};
export const actualizarTarifaActividad = async (
  body: TBodyActualizarTarifaActividad
) => await AUTH_API.patch(`/publicaciones/actividades/actualizar-tarifa`, body);

export const obtenerTarifasActividad = async (idOferta: string) =>
  await AUTH_API.get(
    `/publicaciones/actividades/obtener-datos-registrados-tarifa/${idOferta}`
  );

export const eliminarTarifaActividad = async (idTarifa: number) =>
  await AUTH_API.delete(
    `/publicaciones/actividades/eliminar-tarifa/${idTarifa}`
  );

  export const publicarActividad = async (idOferta: string) =>
  await AUTH_API.post(`/publicaciones/actividades/publicar-actividad/${idOferta}
`);
