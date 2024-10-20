import AUTH_API from "../AuthBackendApi";

export const obtenerDatosRegistroTarifas = async (id_oferta: string) =>
  await AUTH_API.get(`/alojamientos/datos-registro-tarifa/${id_oferta}`);

export const obtenerDatosRegistradosTarifas = async (id_oferta: string) =>
  await AUTH_API.get(
    `/alojamientos/obtener-datos-registrados-tarifa/${id_oferta}`
  );

type TTarifa = {
  id_tipo_detalle: string;
  id_tipo_pension: number;
  monto_tarifa: number;
};
export type TBodyGuardarTarifas = {
  fecha_desde: string;
  fecha_hasta: string;
  tarifas: TTarifa[];
};
export const guardarTarifas = async (body: TBodyGuardarTarifas) =>
  await AUTH_API.post(`/alojamientos/registrar-tarifa`, body);

export const eliminarTarifa = async (id_tarifa: number) =>
  await AUTH_API.delete(`/alojamientos/eliminar-tarifa/${id_tarifa}`);
