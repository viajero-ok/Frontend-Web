import AUTH_API from "../AuthBackendApi";

export const crearHabitacion = async () =>
  AUTH_API.post(`/alojamientos/registrar-habitacion`, {
    nombre_tipologia: "Cama individual",
    cantidad: 2,
  });

export const eliminarHabitación = async (idTipoDetalle: string) =>
  AUTH_API.delete(`/alojamientos/eliminar-habitacion/${idTipoDetalle}`);
