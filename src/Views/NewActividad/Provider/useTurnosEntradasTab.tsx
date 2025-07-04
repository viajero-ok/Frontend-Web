import React from "react";
import {
  actualizarHorario,
  eliminarHorario,
  obtenerDatosRegistradosHorariosyEntradas,
  registrarEntrada,
  actualizarEntrada as actualizarEntradaService,
  eliminarEntrada as eliminarEntradaService,
  registrarHorario,
  TBodyActualizarEntrada,
  TBodyActualizarHorario,
  TBodyRegistrarEntrada,
  TBodyRegistrarHorario,
} from "../../../App/Actividades/TurnosyHorarios";

export type TurnosEntradasContextValue = {
  actualizarTurnosEntradas: () => void;
  /** turnos */
  turnos: any[];
  agregarTurno: (body: TBodyRegistrarHorario) => Promise<any>;
  actualizarTurno: (body: TBodyActualizarHorario) => Promise<void>;
  eliminarTurno: (idHorario: number) => Promise<void>;
  /** entradas */
  entradas: any[];
  agregarEntrada: (body: TBodyRegistrarEntrada) => Promise<void>;
  actualizarEntrada: (body: TBodyActualizarEntrada) => Promise<void>;
  eliminarEntrada: (idEntrada: number) => Promise<void>;
};

const useTurnosEntradasTab = ({ idOferta }: { idOferta: string }) => {
  /** turnos */
  const [turnos, setTurnos] = React.useState<any[]>([]);
  /** entradas */
  const [entradas, setEntradas] = React.useState<any[]>([]);

  const actualizarTurnosEntradas = () => {
    obtenerDatosRegistradosHorariosyEntradas(idOferta)
      .then((response) => {
        setTurnos(response.data.datos_horarios_entradas.horarios_turnos);
        setEntradas(response.data.datos_horarios_entradas.entradas);
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    actualizarTurnosEntradas();
  }, []);

  /** turnos */
  const agregarTurno = async (body: TBodyRegistrarHorario) => {
    try {
      const response = (await registrarHorario(body)).data;
      return response.id_horario;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const actualizarTurno = async (body: TBodyActualizarHorario) => {
    try {
      await actualizarHorario(body);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const eliminarTurno = async (idHorario: number) => {
    try {
      await eliminarHorario(idHorario);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  /** entradas */
  const agregarEntrada = async (body: TBodyRegistrarEntrada) => {
    try {
      await registrarEntrada(body);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const actualizarEntrada = async (body: TBodyActualizarEntrada) => {
    try {
      await actualizarEntradaService(body);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const eliminarEntrada = async (idEntrada: number) => {
    try {
      await eliminarEntradaService(idEntrada);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const context: TurnosEntradasContextValue = {
    actualizarTurnosEntradas,
    /** turnos */
    turnos,
    agregarTurno,
    actualizarTurno,
    eliminarTurno,
    /** entradas */
    entradas,
    agregarEntrada,
    actualizarEntrada,
    eliminarEntrada,
  };

  return context;
};

export { useTurnosEntradasTab };
