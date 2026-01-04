import { Dispatch, SetStateAction } from "react";
import AUTH_API from "../AuthBackendApi";
import { fileToBase64 } from "../Ofertas/Ofertas";

export const crearHabitacion = async (id_oferta: string) =>
  AUTH_API.post(
    `/alojamientos/alojamiento-con-tipologias/pestanna-tipologias/habitaciones/registrar-habitacion`,
    {
      id_oferta: id_oferta,
    }
  );

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
  AUTH_API.patch(
    `/alojamientos/alojamiento-con-tipologias/pestanna-tipologias/habitaciones/actualizar-habitacion`,
    body
  );

export const eliminarHabitacion = async (idTipoDetalle: string) =>
  AUTH_API.delete(
    `/alojamientos/alojamiento-con-tipologias/pestanna-tipologias/habitaciones/eliminar-habitacion/${idTipoDetalle}`
  );

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
    await AUTH_API.post(
      `alojamientos/alojamiento-con-tipologias/imagenes-tipo-detalle/registrar-imagen`,
      body,
      {
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
      }
    )
  ).data as { id_imagen: number };

  const base64 = await fileToBase64(body.imagen);
  return { id_imagen: response.id_imagen, base64 };
};

export const eliminarImagenHabitacion = async (idImagen: number) =>
  await AUTH_API.delete(
    `alojamientos/alojamiento-con-tipologias/imagenes-tipo-detalle/eliminar-imagen/${idImagen}`
  );

export const obtenerDatosRegistroHabitacion = async () =>
  await AUTH_API.get(
    `/alojamientos/alojamiento-con-tipologias/pestanna-tipologias/habitaciones/datos-registro-habitacion`
  );

export const obtenerDatosRegistradosHabitacion = async (id_oferta: string) =>
  await AUTH_API.get(
    `/alojamientos/alojamiento-con-tipologias/pestanna-tipologias/habitaciones/obtener-datos-registrados-habitacion/${id_oferta}`
  );

export const obtenerDatosRegistroVivienda = async () =>
  await AUTH_API.get(
    `/alojamientos/alojamiento-con-tipologias/pestanna-tipologias/viviendas/datos-registro-vivienda`
  );

export type TBodyGuardarVivienda = {
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
    bl_baño_adaptado: boolean;
  };
  caracteristicas: number[];
  ambientes_comunes: number[];
  observaciones: {
    texto_observacion_comodidades_y_servicios_habitacion: string;
  };
};

export const registrarVivienda = async (id_oferta: string) =>
  await AUTH_API.post(
    `alojamientos/alojamiento-con-tipologias/pestaña-tipologias/viviendas/registrar-vivienda`,
    { id_oferta }
  );

export const actualizarVivienda = async (body: TBodyGuardarVivienda) =>
  await AUTH_API.patch(
    `/alojamientos/alojamiento-con-tipologias/pestaña-tipologias/viviendas/actualizar-vivienda`,
    body
  );
export const eliminarVivienda = async (idTipoDetalle: string) =>
  AUTH_API.delete(
    `/alojamientos/alojamiento-con-tipologias/pestaña-tipologias/viviendas/eliminar-vivienda/${idTipoDetalle}`
  );

export const obtenerDatosRegistradosVivienda = async (id_oferta: string) =>
  AUTH_API.get(
    `alojamientos/alojamiento-con-tipologias/pestaña-tipologias/viviendas/obtener-datos-registrados-vivienda/${id_oferta}`
  );
