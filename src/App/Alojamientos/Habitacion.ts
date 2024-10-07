import AUTH_API from "../AuthBackendApi";

export const crearHabitacion = async (id_oferta: string) =>
  AUTH_API.post(`/alojamientos/registrar-habitacion`, {
    id_oferta: id_oferta,
  });

export type TBodyGuardarHabitacion = {
  id_oferta: string;
  id_tipo_detalle: string;
  tipologia: {
    nombre_tipologia: string;
    cantidad: number;
  };
  plazas: {
    id_tipo_cama: number;
    cantidad_camas: number;
  }[];
  baño: {
    cantidad_baños: number;
    bl_baño_compartido: boolean;
    bl_baño_adaptado: boolean;
  };
  caracteristicas: number[];
  observaciones: {
    texto_observacion_comodidades_y_servicios_habitacion: string;
  };
};
export const guardarHabitacion = async (body: TBodyGuardarHabitacion) =>
  AUTH_API.patch(`/alojamientos/actualizar-habitacion`, body);

export const eliminarHabitacion = async (idTipoDetalle: string) =>
  AUTH_API.delete(`/alojamientos/eliminar-habitacion/${idTipoDetalle}`);

type TBodyGuardarImagenDeHabitacion = {
  imagen: File;
  id_oferta: string;
  id_tipo_detalle: string;
};
export const guardarImagenDeHabitacion = async (
  body: TBodyGuardarImagenDeHabitacion
) =>
  AUTH_API.post(`/alojamientos/registrar-imagen-habitacion`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const obtenerDatosRegistroHabitacion = async () =>
  await AUTH_API.get(`/alojamientos/datos-registro-habitacion`);

export const obtenerDatosRegistradosHabitacion = async (id_oferta: string) =>
  await AUTH_API.get(
    `/alojamientos/obtener-datos-registrados-habitacion/${id_oferta}`
  );
