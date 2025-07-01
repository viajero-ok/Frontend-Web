import { Dispatch, SetStateAction } from "react";
import AUTH_API from "../AuthBackendApi";
import { z } from "zod";

export const obtenerOfertasPorPrestador = async () =>
  await AUTH_API.get(`ofertas-turisticas/por-prestador`);

type TEliminarOferta = {
  id_oferta: string;
  id_tipo_oferta: number;
};

export const eliminarOferta = async (data: TEliminarOferta) =>
  await AUTH_API.delete(`/ofertas-turisticas/eliminar-oferta-turistica`, {
    data,
  });

//&id_tipo_oferta=2&id_establecimiento=4&nombre_oferta=Hotel%20de%20Montaña&id_provincia=7&id_departamento=12&id_localidad=25&min_monto_garantia=100&max_monto_garantia=500&min_dias_estadia=3
type TFiltros = {
  pagina: number;
  limite: number;
  id_tipo_oferta: number;
  id_sub_tipo_oferta?: number;
  id_localidad?: number;
  min_monto?: number;
  max_monto?: number;
  latitud?: string;
  longitud?: string;
  radio?: number;
  fecha_desde: string;
  fecha_hasta: string;
  cantidad_personas: number;
};
export const consultarOfertasTurista = async (filtros: TFiltros) => {
  const params = Object.entries(filtros)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return await AUTH_API.get(
    `/ofertas-turisticas/obtener-ofertas-turisticas?${params}`
  );
};

type TData = {
  id_oferta: string;
  fecha_desde: string;
  fecha_hasta: string;
  cantidad_personas: number;
};
export const obtenerOfertaTuristica = async (data: TData) => {
  return await AUTH_API.get(`/ofertas-turisticas/obtener-oferta-turistica`, {
    params: data,
  });
};

type TParamsObtenerResumenOferta = {
  id_oferta: string;
  id_detalle: string;
  fecha_desde: string;
  fecha_hasta: string;
  cantidad_personas: number;
};
export const obtenerResumenOferta = async (data: TParamsObtenerResumenOferta) =>
  await AUTH_API.get(`/ofertas-turisticas/obtener-resumen-oferta-turistica`, {
    params: data,
  });

export const obtenerOfertasGuardadas = async () =>
  await AUTH_API.get(
    `/ofertas-turisticas/obtener-ofertas-guardadas-por-usuario`
  );

export const obtenerOfertasReservadas = async () =>
  await AUTH_API.get(`/reservas/obtener-ofertas-reservadas-por-usuario`);

export const eliminarOfertaGuardada = async (idOfertaGuardada: number) =>
  await AUTH_API.delete(
    `/ofertas-turisticas/eliminar-oferta-turistica-guardada/${idOfertaGuardada}`
  );

type TParamsGuardarOfertaGuardada = {
  id_oferta: string;
};

export const guardarOfertaGuardada = async (
  data: TParamsGuardarOfertaGuardada
) => await AUTH_API.post(`/ofertas-turisticas/guardar-oferta-turistica`, data);

/** TODO: mover a utils */
export function fileToBase64(file: File): Promise<string> {
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
const guardarImagenOfertaTuristicaSchema = z.object({
  id_imagen: z.number(),
});
export type TGuardarImagenOfertaTuristicaResponse = z.infer<
  typeof guardarImagenOfertaTuristicaSchema
>;
export type TBodyGuardarImagenOfertaTuristica = {
  imagen: File;
  id_oferta: string;
  setProgress: Dispatch<SetStateAction<number>>;
};
export const guardarImagenOfertaTuristica = async (
  body: TBodyGuardarImagenOfertaTuristica
): Promise<{ id_imagen: number; base64: string }> => {
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
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const eliminarImagenOfertaTuristica = async (idImagen: number) =>
  await AUTH_API.delete(
    `/ofertas-turisticas/eliminar-imagen-oferta-turistica/${idImagen}`
  );
