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

type TBodyGuardarDatosBasicosEvento = {
  id_oferta: string;

  nombre: string;
  id_sub_categoria: number;
  descripcion: string;
  requisitos: string;
  url_venta_entradas: string;
  fecha_hora_inicio: Date;
  fecha_hora_fin: Date;
  observaciones: string;
};
export const guardarDatosBasicosEvento = async (
  body: TBodyGuardarDatosBasicosEvento
) => await AUTH_API.post(`/evento/datos-basicos`, body);

export const obtenerDatosRegistradosEvento = async (id_oferta: string) =>
  await AUTH_API.get(`/evento/obtener-datos-registrados/${id_oferta}`);

export type TBodyRegistrarEntradaEvento = {
  id_oferta: string;
  nombre: string;
  incluye: string;
  precio: number;
  sin_precio: boolean;
};
export const registrarEntradaService = async (
  body: TBodyRegistrarEntradaEvento
) => await AUTH_API.post(`/evento/entradas/registrar-entrada`, body);

export type TBodyModificarEntradaEvento = {
  id_oferta: string;
  id_entrada: number;
  nombre: string;
  incluye: string;
  precio: number;
  sin_precio: boolean;
};
export const modificarEntradaService = async (
  body: TBodyModificarEntradaEvento
) => await AUTH_API.post(`/evento/entradas/modificar-entrada`, body);

export type TBodyEliminarEntradaEvento = {
  id_oferta: string;
  id_entrada: number;
};
export const eliminarEntradaService = async (
  body: TBodyEliminarEntradaEvento
) =>
  await AUTH_API.delete(`/evento/entradas/eliminar-entrada`, { params: body });

export const obtenerEntradasService = async (idOferta: string) =>
  AUTH_API.get(`/evento/entradas/obtener-entradas/${idOferta}`);

export const publicarEventoService = async (idOferta: string) =>
  await AUTH_API.post(`/evento/publicar/publicar-evento`, {
    id_oferta: idOferta,
  });
