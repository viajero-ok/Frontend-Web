import AUTH_API from "../AuthBackendApi";

type TGuia = {
  id_oferta: string;
  nro_resolucion: string;
  nombre_y_apellido: string;
  id_guia?: number;
};
export const guardarGuia = async (guia: TGuia) => {
  return await AUTH_API.post(`/actividades/registrar-guia`, guia);
};

type TEliminarGuia = {
  id_guia: number;
  id_oferta: string;
}
export const eliminarGuia = async (guia: TEliminarGuia) =>
  await AUTH_API.delete(`/actividades/eliminar-guia`, { data: guia });


export const modificarGuia = async (guia: TGuia) => {
  return await AUTH_API.patch(`/actividades/modificar-guia`, guia);
};

type TBodyRegistrarNuevaActividad = {
  id_tipo_oferta: number;
    id_sub_tipo_oferta?: number;
    id_establecimiento: number;
};

export const registrarNuevaActividad = async (
    body: TBodyRegistrarNuevaActividad
) => await AUTH_API.post(`/ofertas-turisticas/registrar-oferta-turistica`, body);

export const getDatosDeRegistroNuevaActividad = async () =>
    await AUTH_API.get(`/actividades/datos-registro-actividades`);

export type TBodyGuardarActividad = {
    id_oferta: string;
    id_sub_tipo_oferta: number;
    id_sub_categoria: number;
    nombre_actividad: string;
    descripcion_actividad: string;
    requisitos_actividad: string;
    id_dificultad: number;
    duracion_actividad: number;
    distancia_actividad: number;
    bl_con_guia: boolean;
    politicas_reserva: {
      id_politica_cancelacion: number;
      plazo_dias_cancelacion: number;
      porcentaje_pago_anticipado: number;
      id_tipo_pago_anticipado: number;
    },
    metodos_de_pago: []
  };
  export const guardarActividad = async (body: TBodyGuardarActividad) =>
    await AUTH_API.patch(`/actividades/actualizar-actividad`, body);

  export const obtenerDatosRegistradosActividad = async (id_oferta: string) => {
    return await AUTH_API.get(
      `/actividades/obtener-datos-registrados-actividad/${id_oferta}`
    );
  }