import AUTH_API from "../AuthBackendApi";

export const crearHabitacion = async () =>
  AUTH_API.post(`/alojamientos/registrar-habitacion`, {
    nombre_tipologia: "Cama individual",
    cantidad: 2,
  });

export const eliminarHabitación = async (idTipoDetalle: string) =>
  AUTH_API.delete(`/alojamientos/eliminar-habitacion/${idTipoDetalle}`);

type TBodyGuardarImagenDeHabitacion = {
  imagen: File;
  id_oferta: string;
};
export const guardarImagenDeHabitacion = async (
  body: TBodyGuardarImagenDeHabitacion
) =>
  AUTH_API.post(
    `/alojamientos/registrar-imagen-habitacion`,
    {
      id_oferta: body.id_oferta,
      imagen: body.imagen,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const obtenerDatosRegistroHabitacion = async () =>
  await AUTH_API.get(`/alojamientos/datos-registro-habitacion`);

export const obtenerDatosRegistradosHabitacion = async (id_oferta: string) =>
  await AUTH_API.get(
    `/alojamientos/obtener-datos-registrados-habitacion/${id_oferta}`
  );
