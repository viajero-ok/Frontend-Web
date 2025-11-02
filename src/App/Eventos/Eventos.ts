import AUTH_API from "../AuthBackendApi";

type TBodyRegistrarNuevoEvento = {
  id_tipo_oferta: 3;
  //id_sub_tipo_oferta?: number;
  id_establecimiento: number;
};

export const registrarNuevoEvento = async (body: TBodyRegistrarNuevoEvento) =>
  await AUTH_API.post(`/ofertas-turisticas/registrar-oferta-turistica`, body);

export const obtenerCategoriasEventos = async () =>
  await AUTH_API.get(`/evento/categorias-eventos`);
