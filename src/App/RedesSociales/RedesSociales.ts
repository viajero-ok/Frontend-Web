import AUTH_API from "../AuthBackendApi";

// export class NuevaRedSocialDto {
// 	@IsNumber()
// 	readonly id_tipo_entidad: number;

// 	@IsString()
// 	readonly id_entidad: string;

// 	@IsNumber()
// 	readonly id_red_social: number;

// 	@IsString()
// 	readonly nombre_usuario: string;

// 	@IsString()
// 	readonly url: string;
// }

export type TBodyRegistrarRedSocial = {
  id_tipo_entidad: 1; // 1 para oferta
  id_entidad: string; // id_oferta
  id_red_social: number;
  nombre_usuario: string;
  url: string;
};
export const registrarRedSocial = async (body: TBodyRegistrarRedSocial) =>
  await AUTH_API.post(`/redes-sociales/nueva`, {
    ...body,
    id_oferta: body.id_entidad,
  });

export type TBodyEliminarRedSocial = {
  id_tipo_entidad: 1; // 1 para oferta
  id_entidad: string; // id_oferta
  id_red_social: number;
};
export const eliminarRedSocial = async (body: TBodyEliminarRedSocial) =>
  await AUTH_API.delete(`/redes-sociales/eliminar`, {
    data: {
      ...body,
      id_oferta: body.id_entidad,
    },
  });

export const obtenerDatosRegistroRedesSociales = async () =>
  await AUTH_API.get(`/redes-sociales/datos-registro`);
