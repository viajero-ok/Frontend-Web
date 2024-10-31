import AUTH_API from "../AuthBackendApi";

type TBodyRegistrarHorario = {
	id_oferta: string;
};

export const registrarHorario = async (id_oferta: string) => 
	await AUTH_API.post(`/actividades/registrar-horario`, { id_oferta });


type TBodyEliminarHorario = {
	id_horario: number;
};

export const eliminarHorario = async (
	body: TBodyEliminarHorario
) => await AUTH_API.delete(`/actividades/eliminar-horario/${body.id_horario}`);

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

export type TEntrada = {
	entradas: {
		id_entrada: number,
		nombre: string,
		descripcion: string
	},
};



export const guardarEntrada = async (id_oferta: string) =>
	await AUTH_API.post(`/actividades/registrar-entrada`, { id_oferta });

export const eliminarEntrada = async (id_entrada: number) =>
	await AUTH_API.delete(`/actividades/eliminar-entrada/${id_entrada}`);

export const obtenerDatosRegistradosHorariosyEntradas = async (id_oferta: string) =>
	await AUTH_API.get(`/actividades/obtener-datos-registrados-horarios-y-entradas/${id_oferta}`);




