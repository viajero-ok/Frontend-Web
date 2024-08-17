import AUTH_API from "../AuthBackendApi";

type TBodyRegistrarEstablecimiento = {
  nombre: string;
  numero_habilitacion: string;
  descripcion: string;
  telefono: string;
  mail: string;
  calle: string;
  sin_numero: boolean;
  numero: number;
  id_localidad: number;
  id_departamento: number;
  latitud: string;
  longitud: string;
};
type TRegistrarEstablecimiento = (body: TBodyRegistrarEstablecimiento) => any;
export const registrarEstablecimiento: TRegistrarEstablecimiento = async (
  body: TBodyRegistrarEstablecimiento
) => await AUTH_API.post(`/alojamientos/registrar-establecimiento`, body);
