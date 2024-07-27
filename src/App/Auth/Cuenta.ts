import API from "../BackendApi";

type TBodyRegistrarCuenta = {
  mail: "string";
  contraseña: "string";
};
type TResponseRegistrarCuenta = {
  resultado: string;
  descripcion: string;
  id_usuario: string;
};
type TRegistrarCuenta = (
  body: TBodyRegistrarCuenta
) => Promise<TResponseRegistrarCuenta>;
export const registrarCuenta: TRegistrarCuenta = async (
  body: TBodyRegistrarCuenta
) => await API.post(`/auth/registrar/cuenta`, body);

type TBodyVerificarCuenta = {
  id_usuario: "string";
  codigo_verificacion: "string";
};
type TVerificarCuenta = (body: TBodyVerificarCuenta) => Promise<any>;
export const verificarCuenta: any = async (body: TBodyVerificarCuenta) =>
  await API.post(`/auth/verificar/cuenta`, body);
