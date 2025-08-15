import AUTH_API from "../AuthBackendApi";

type TBodyReservarOferta = {
  id_oferta: string;
  mail_contacto: string;
  telefono_contacto: string;
  fecha_desde: string;
  fecha_hasta: string;
  detalles: {
    id_tipo_detalle: string;
    cantidad: number;
  }[];
};
export const reservarOferta = async (body: TBodyReservarOferta) =>
  await AUTH_API.post(`/reservas/reservar-alojamiento`, body);

export const obtenerReservasPorPrestador = async () =>
  await AUTH_API.get(`/reservas/obtener-reservas-por-prestador`);
