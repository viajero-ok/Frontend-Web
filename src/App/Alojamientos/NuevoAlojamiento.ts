import { Dispatch, SetStateAction } from "react";
import AUTH_API from "../AuthBackendApi";
import { z } from "zod";
import {
  adaptObtenerDatosRegistradosAlojamiento,
  TAdaptedObtenerDatosRegistradosAlojamientoResponse,
} from "./NuevoAlojamiento.adapter";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      // This includes the prefix: data:image/png;base64,...
      resolve(result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file); // reads file as base64 data URL
  });
}

type TBodyRegistrarNuevoAlojamiento = {
  id_tipo_oferta: number;
  id_sub_tipo_oferta: number;
  id_establecimiento: number;
};

export const registrarNuevoAlojamiento = async (
  body: TBodyRegistrarNuevoAlojamiento
) =>
  await AUTH_API.post(`/ofertas-turisticas/registrar-oferta-turistica`, body);

export const finalizarRegistroAlojamiento = async (id_oferta: string) =>
  await AUTH_API.post(
    `/alojamientos/alojamiento-con-tipologias/finalizar-registro-alojamiento/${id_oferta}`
  );

export const getDatosDeRegistroNuevoAlojamiento = async () =>
  await AUTH_API.get(
    `/alojamientos/alojamiento-con-tipologias/pestanna-alojamiento/datos-registro-alojamiento`
  );

export type THorariosCheckInCheckOut = {
  id_horario: string;
  check_in: {
    hora_check_in: number;
    minuto_check_in: number;
  };
  check_out: {
    hora_check_out: number;
    minuto_check_out: number;
  };
  aplica_todos_los_dias: boolean;
  dias_semana: {
    aplica_lunes: boolean;
    aplica_martes: boolean;
    aplica_miercoles: boolean;
    aplica_jueves: boolean;
    aplica_viernes: boolean;
    aplica_sabado: boolean;
    aplica_domingo: boolean;
  };
};

export type TBodyGuardarAlojamiento = {
  id_oferta: string;
  id_subtipo_oferta: number;
  caracteristicas: number[];
  metodos_de_pago: number[];
  observaciones: {
    texto_observacion_comodidades_y_servicios_oferta: string;
    texto_observacion_canchas_deportes: string;
    texto_observacion_normas: string;
    texto_observacion_politica_garantia: string;
  };
  politicas_reserva_y_datos_basicos: {
    datos_basicos: {
      nombre_alojamiento: string;
      descripcion_alojamiento: string;
      id_sub_categoria_alojamiento: number;
    };
    politicas_reserva: {
      id_politica_cancelacion: number;
      plazo_dias_cancelacion: number;
      solicita_garantia: boolean;
      monto_garantia: number; // float
      id_tipo_pago_anticipado: number;
      porcentaje_pago_anticipado: number; // float
      monto_pago_anticipado: number; // float
      minimo_dias_estadia: number;
    };
  };
};
export const guardarAlojamiento = async (body: TBodyGuardarAlojamiento) =>
  await AUTH_API.patch(
    `/alojamientos/alojamiento-con-tipologias/pestanna-alojamiento/actualizar-alojamiento`,
    body
  );

const guardarImagenDeAlojamientoSchema = z.object({
  id_imagen: z.number(),
});
export type TGuardarImagenDeAlojamientoResponse = z.infer<
  typeof guardarImagenDeAlojamientoSchema
>;
type TBodyGuardarImagenDeAlojamiento = {
  imagen: File;
  id_oferta: string;
  setProgress: Dispatch<SetStateAction<number>>;
};
export const guardarImagenDeAlojamiento = async (
  body: TBodyGuardarImagenDeAlojamiento
) => {
  try {
    const response = (
      await AUTH_API.post(
        `/ofertas-turisticas/registrar-imagen-oferta-turistica`,
        {
          id_oferta: body.id_oferta,
          imagen: body.imagen,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            console.log("event: ", progressEvent);
            if (!progressEvent.total && !progressEvent.estimated) return;
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
    ).data;
    const parsedResponse = guardarImagenDeAlojamientoSchema.parse(response);
    const base64 = await fileToBase64(body.imagen);

    return { ...parsedResponse, base64 };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const eliminarImagenDeAlojamiento = async (id_imagen: number) =>
  await AUTH_API.delete(`/ofertas-turisticas/eliminar-imagen-oferta-turistica/${id_imagen}
`);

export type TBodyCrearHorario = {
  id_oferta: string;
};
export const registrarHorario = async (body: TBodyCrearHorario) =>
  await AUTH_API.post(
    `/alojamientos/alojamiento-con-tipologias/pestanna-alojamiento/registrar-horario`,
    body
  );

export const eliminarHorario = async (id_horario: string) =>
  await AUTH_API.delete(
    `/alojamientos/alojamiento-con-tipologias/pestanna-alojamiento/eliminar-horario/${id_horario}`
  );

const serverImageSchema = z.object({
  id_imagen: z.number(),
  nombre: z.string(),
  datos: z.string(),
});
export type TServerImage = z.infer<typeof serverImageSchema>;
const obtenerDatosRegistradosAlojamientoSchema = z.object({
  datos: z.object({
    datos_basicos: z.any(),
    caracteristicas: z.array(z.any()).optional(),
    metodos_de_pago: z.array(z.any()).optional(),
    observaciones: z.any(),
    horarios_checkin_checkout: z.any(),
  }),
  imagenes: z.array(serverImageSchema),
});
export type TObtenerDatosRegistradosAlojamientoResponse = z.infer<
  typeof obtenerDatosRegistradosAlojamientoSchema
>;
export const obtenerDatosRegistradosAlojamiento = async (
  id_oferta: string
): Promise<TAdaptedObtenerDatosRegistradosAlojamientoResponse> => {
  try {
    const response = (
      await AUTH_API.get(
        `/alojamientos/alojamiento-con-tipologias/pestanna-alojamiento/obtener-datos-registrados-alojamiento/${id_oferta}`
      )
    ).data;
    const parsedResponse =
      obtenerDatosRegistradosAlojamientoSchema.parse(response);
    return adaptObtenerDatosRegistradosAlojamiento(parsedResponse);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export type TBodyRegistrarHorarioAlojamiento = {
  id_oferta: string;
  check_in: {
    hora_check_in: number;
    minuto_check_in: number;
  };
  check_out: {
    hora_check_out: number;
    minuto_check_out: number;
  };
  aplica_todos_los_dias: boolean;
  dias_semana: {
    aplica_lunes: boolean;
    aplica_martes: boolean;
    aplica_miercoles: boolean;
    aplica_jueves: boolean;
    aplica_viernes: boolean;
    aplica_sabado: boolean;
    aplica_domingo: boolean;
  };
  //cupo_maximo?: number;
  //bl_sin_cupo: boolean;
};
export const registrarHorarioAlojamiento = async (
  body: TBodyRegistrarHorarioAlojamiento
) =>
  await AUTH_API.post(
    `/alojamientos/alojamiento-con-tipologias/pestanna-alojamiento/registrar-horario`,
    {
      ...body,
    }
  );

export type TBodyActualizarHorarioAlojamiento =
  TBodyRegistrarHorarioAlojamiento & {
    id_horario: number;
  };
export const actualizarHorarioAlojamiento = async (
  body: TBodyActualizarHorarioAlojamiento
) =>
  await AUTH_API.post(
    `/alojamientos/alojamiento-con-tipologias/pestanna-alojamiento/modificar-horario`,
    {
      ...body,
    }
  );

export const eliminarHorarioAlojamiento = async (idHorario: number) =>
  await AUTH_API.delete(
    `/alojamientos/alojamiento-con-tipologias/pestanna-alojamiento/eliminar-horario/${idHorario}`
  );

export const obtenerHorariosRegistradosAlojamiento = async (idOferta: string) =>
  await AUTH_API.get(
    `/alojamientos/alojamiento-con-tipologias/pestanna-alojamiento/obtener-horarios-registrados/${idOferta}`
  );
