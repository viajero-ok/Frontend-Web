import AUTH_API from "../AuthBackendApi";

// readonly cupo_maximo: number;
// readonly bl_sin_cupo: boolean;

export type TBodyRegistrarHorario = {
  id_oferta: string;
  check_in: {
    hora_check_in: number;
    minuto_check_in: number;
  };
  check_out: {
    hora_check_out: number;
    minuto_check_out: number;
  };
  aplica_todos_los_dias: boolean;
  dias_semana: {
    aplica_lunes: boolean;
    aplica_martes: boolean;
    aplica_miercoles: boolean;
    aplica_jueves: boolean;
    aplica_viernes: boolean;
    aplica_sabado: boolean;
    aplica_domingo: boolean;
  };
  cupo_maximo?: number;
  bl_sin_cupo: boolean;
};
export const registrarHorario = async (body: TBodyRegistrarHorario) =>
  await AUTH_API.post(`/actividades/registrar-horario`, {
    ...body,
  });

export type TBodyActualizarHorario = TBodyRegistrarHorario & {
  id_horario: number;
};
export const actualizarHorario = async (body: TBodyActualizarHorario) =>
  await AUTH_API.post(`/actividades/actualizar-horario`, {
    ...body,
  });

export const eliminarHorario = async (idHorario: number) =>
  await AUTH_API.delete(`/actividades/eliminar-horario/${idHorario}`);


export type THorarios = {
  id_horario: number;
  inicio: {
    hora_inicio: string;
    minuto_inicio: string;
  };
  fin: {
    hora_fin: string;
    minuto_fin: string;
  };
  aplica_todos_los_dias: boolean;
  dias_semana: {
    aplica_lunes: boolean;
    aplica_martes: boolean;
    aplica_miercoles: boolean;
    aplica_jueves: boolean;
    aplica_viernes: boolean;
    aplica_sabado: boolean;
    aplica_domingo: boolean;
  };
  sin_cupo: boolean;
  cupo_maximo: number;
};

export type TBodyRegistrarEntrada = {
  id_oferta: string;
  nombre: string;
  descripcion: string;
};
export const registrarEntrada = async (body: TBodyRegistrarEntrada) =>
  await AUTH_API.post(`/actividades/registrar-entrada`, body);

export type TBodyActualizarEntrada = TBodyRegistrarEntrada & { id_entrada: number };
export const actualizarEntrada = async (body: TBodyActualizarEntrada) =>
  await AUTH_API.post(`/actividades/actualizar-entrada`, body);

export const eliminarEntrada = async (id_entrada: number) =>
  await AUTH_API.delete(`/actividades/eliminar-entrada/${id_entrada}`);

export const obtenerDatosRegistradosHorariosyEntradas = async (
  id_oferta: string
) =>
  await AUTH_API.get(
    `/actividades/obtener-datos-registrados-horarios-y-entradas/${id_oferta}`
  );
