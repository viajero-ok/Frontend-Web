import AUTH_API from "../AuthBackendApi";

export type TUbicacion = {
    id_oferta: string;
    calle: string;
    sin_numero: boolean;
    numero: string;
    id_localidad: number;
    id_departamento: number;
    id_provincia: number;
    latitud: string;
    longitud: string;
    observaciones: string;
}

export type TUbicacionEstablecimiento = {
    id_oferta: string;
    id_establecimiento: string;
    misma_ubicacion_establecimiento: boolean;
}

export const guardarUbicacion = async (ubicacion: TUbicacion | TUbicacionEstablecimiento) => {
  return await AUTH_API.post(`/actividades/registrar-ubicacion-actividad`, ubicacion);
};

export const obtenerDatosRegistradosUbicacion = async (id_oferta: string) => {
  return await AUTH_API.get(`/actividades/obtener-datos-registrados-ubicacion/${id_oferta}`);
};
