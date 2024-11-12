import AUTH_API from "../AuthBackendApi";

export const autorizarPago = async () => {
  const response = await AUTH_API.get(
    `/pagos/solicitar-autorizacion-prestador`
  );
  return response.data;
};

export const generarOrden = async (id_reserva: string) =>
  await AUTH_API.post(`/pagos/generar-orden/${id_reserva}`);
