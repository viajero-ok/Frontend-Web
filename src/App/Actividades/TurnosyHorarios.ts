import AUTH_API from "../AuthBackendApi";

<<<<<<< Updated upstream
type TBodyRegistrarHorario = {
	id_oferta: string;
=======
// readonly cupo_maximo: number;
// readonly bl_sin_cupo: boolean;

export type TBodyRegistrarHorario = {
  id_oferta: string;
  check_in: {
    hora_check_in?: number;
    minuto_check_in?: number;
  };
  check_out: {
    hora_check_out?: number;
    minuto_check_out?: number;
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
>>>>>>> Stashed changes
};

export const registrarHorario = async (id_oferta: string) => 
	await AUTH_API.post(`/actividades/registrar-horario`, { id_oferta });


<<<<<<< Updated upstream
type TBodyEliminarHorario = {
	id_horario: number;
=======
export type TBodyActualizarHorario = TBodyRegistrarHorario & {
  id_horario: number;
>>>>>>> Stashed changes
};
export const actualizarHorario = async (body: TBodyActualizarHorario) =>
  await AUTH_API.post(`/actividades/actualizar-horario`, {
    ...body,
  });

<<<<<<< Updated upstream
export const eliminarHorario = async (
	body: TBodyEliminarHorario
) => await AUTH_API.delete(`/actividades/eliminar-horario/${body.id_horario}`);
=======
export const eliminarHorario = async (idHorario: number) =>
  await AUTH_API.delete(`/actividades/eliminar-horario/${idHorario}`);
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
export type TEntrada = {
	entradas: {
		id_entrada: number,
		nombre: string,
		descripcion: string
	},
=======
export type TBodyRegistrarEntrada = {
  id_oferta: string;
  nombre: string;
  descripcion: string;
>>>>>>> Stashed changes
};
export const registrarEntrada = async (body: TBodyRegistrarEntrada) =>
  await AUTH_API.post(`/actividades/registrar-entrada`, body);

<<<<<<< Updated upstream


export const guardarEntrada = async (id_oferta: string) =>
	await AUTH_API.post(`/actividades/registrar-entrada`, { id_oferta });
=======
export type TBodyActualizarEntrada = TBodyRegistrarEntrada & { id_entrada: number };
export const actualizarEntrada = async (body: TBodyActualizarEntrada) =>
  await AUTH_API.post(`/actividades/actualizar-entrada`, body);
>>>>>>> Stashed changes

export const eliminarEntrada = async (id_entrada: number) =>
	await AUTH_API.delete(`/actividades/eliminar-entrada/${id_entrada}`);

export const obtenerDatosRegistradosHorariosyEntradas = async (id_oferta: string) =>
	await AUTH_API.get(`/actividades/obtener-datos-registrados-horarios-y-entradas/${id_oferta}`);




