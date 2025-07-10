import { Dispatch, SetStateAction } from "react";
import AUTH_API from "../AuthBackendApi";
import { fileToBase64 } from "../Ofertas/Ofertas";

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
  setProgress: Dispatch<SetStateAction<number>>;
};
export const guardarImagenDeHabitacion = async (
  body: TBodyGuardarImagenDeHabitacion
) => {
  const response = (
    await AUTH_API.post(`/alojamientos/registrar-imagen-habitacion`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        // if (!progressEvent.total && !progressEvent.estimated) return;
        const percent = Math.round(
          (progressEvent.loaded * 100) /
            (progressEvent.total
              ? progressEvent.total
              : progressEvent.estimated!)
        );
        body.setProgress(percent);
      },
    })
  ).data as { id_imagen: number };

  const base64 = await fileToBase64(body.imagen);
  return { id_imagen: response.id_imagen, base64 };
};

export const eliminarImagenHabitacion = async (idImagen: number) =>
  await AUTH_API.delete(
    `/alojamientos/eliminar-imagen-habitacion/${idImagen}`
  );


export const obtenerDatosRegistroHabitacion = async () =>
  await AUTH_API.get(`/alojamientos/datos-registro-habitacion`);

export const obtenerDatosRegistradosHabitacion = async (id_oferta: string) =>
  await AUTH_API.get(
    `/alojamientos/obtener-datos-registrados-habitacion/${id_oferta}`
  );
