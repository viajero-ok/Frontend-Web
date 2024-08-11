import AUTH_API from "../AuthBackendApi";

type TBodyRegistrarTurista = {
  nombre: string;
  apellido: string;
  nro_documento_identidad: string;
  id_tipo_documento: number;
  telefono: string;
  id_localidad: number;
  id_departamento: number;
  id_provincia: number;
  id_pais: number;
  id_idioma: number;
  id_genero: number;
  fecha_nacimiento: string;
};
export const registrarTurista = async (body: TBodyRegistrarTurista) =>
  await AUTH_API.post(`/auth/registrar/turista`, body);
