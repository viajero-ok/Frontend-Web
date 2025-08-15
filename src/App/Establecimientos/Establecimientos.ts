import { z } from "zod";
import AUTH_API from "../AuthBackendApi";
import {
  EstablecimientoModel,
  ObtenerDatosRegistradosEstablecimientoSchema,
} from "./Establecimientos.Models";
import { adaptObtenerDatosRegistradosEstablecimiento } from "./Establecimientos.Adapters";

export type TBodyRegistrarEstablecimiento = {
  nombre: string;
  numero_habilitacion: string;
  descripcion: string;
  telefono: string;
  mail: string;
  calle: string;
  sin_numero: boolean;
  numero?: string;
  id_localidad: number;
  id_departamento: number;
  id_provincia: number;
  latitud: string;
  longitud: string;
};
export const registrarEstablecimiento = async (
  body: TBodyRegistrarEstablecimiento
) => await AUTH_API.post(`/establecimientos/registrar-establecimiento`, body);

export type TBodyActualizarEstablecimiento = TBodyRegistrarEstablecimiento & {
  id_establecimiento: number;
};
export const actualizarEstablecimiento = async (
  body: TBodyActualizarEstablecimiento
) => await AUTH_API.patch(`/establecimientos/actualizar-establecimiento`, body);

export const obtenerEstablecimientos = async () => {
  const response = await AUTH_API.get(
    `/establecimientos/obtener-establecimientos`
  );
  return response.data;
};

export const eliminarEstablecimiento = async (idEstablecimiento: number) => {
  const response = await AUTH_API.delete(
    `/establecimientos/eliminar-establecimiento/${idEstablecimiento}`
  );
  return response.data;
};

export const obtenerDatosRegistradosEstablecimiento = async (
  idEstablecimiento: number
): Promise<EstablecimientoModel> => {
  try {
    const response = (
      await AUTH_API.get<
        z.infer<typeof ObtenerDatosRegistradosEstablecimientoSchema>
      >(
        `/establecimientos/obtener-datos-registrados-establecimiento/${idEstablecimiento}`
      )
    ).data;
    const parsedResponse =
      ObtenerDatosRegistradosEstablecimientoSchema.parse(response);
    return adaptObtenerDatosRegistradosEstablecimiento(parsedResponse);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
