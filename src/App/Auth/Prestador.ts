import AUTH_API from "../AuthBackendApi";

type TBodyRegistrarPrestador = {
  nombre: string;
  apellido: string;
  nro_documento_identidad: string;
  id_tipo_documento: number;
  telefono: number;
  id_localidad: number;
  id_departamento: number;
  id_provincia: number;
  cuit: string;
  razon_social: string;
  sitio_web: string;
  fecha_nacimiento: string;
};
export const registrarPrestador = async (body: any) => {
  console.log("llega")
  return await AUTH_API.post(`/auth/registrar/prestador`, body);
}
