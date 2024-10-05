import AUTH_API from "../AuthBackendApi";

export const obtenerDatosRegistroTarifas = async () =>
  await AUTH_API.get(`/alojamientos/datos-registro-tarifa`);

export const obtenerDatosRegistradosTarifas = async (id_oferta: string) =>
  await AUTH_API.get(
    `/alojamientos/obtener-datos-registrados-tarifa/${id_oferta}`
  );
