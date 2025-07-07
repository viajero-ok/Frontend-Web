import React from "react";
import {
  crearHabitacion,
  eliminarHabitacion,
  guardarHabitacion,
  obtenerDatosRegistradosHabitacion,
  obtenerDatosRegistroHabitacion,
  TBodyGuardarHabitacion,
} from "../../../../App/Alojamientos/Habitacion";

export type HabitacionesContextValue = {
  habitaciones: any[];
  datosRegistroHabitacion: any;
  crearTipologia: () => Promise<void>;
  eliminarTipologia: (id: string) => Promise<void>;
  guardarTipologia: (body: TBodyGuardarHabitacion) => Promise<any>;
};

const useHabitacionesTab = ({ idOferta }: { idOferta: string }) => {
  const [habitaciones, setHabitaciones] = React.useState<any[]>([]);
  const [datosRegistroHabitacion, setDatosRegistroHabitacion] =
    React.useState<any>();

  const handleObtenerHabitaciones = () => {
    obtenerDatosRegistradosHabitacion(idOferta)
      .then((response: any) => {
        setHabitaciones(response.data.datos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleObtenerDatosRegistro = () => {
    obtenerDatosRegistroHabitacion()
      .then((response) => {
        setDatosRegistroHabitacion(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    handleObtenerHabitaciones();
    handleObtenerDatosRegistro();
  }, []);

  const crearTipologia = async () => {
    try {
      return await crearHabitacion(idOferta).then(() => {
        handleObtenerHabitaciones();
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const guardarTipologia = async (body: TBodyGuardarHabitacion) => {
    try {
      await guardarHabitacion(body);
      handleObtenerHabitaciones();
      return;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const eliminarTipologia = async (id: string) => {
    try {
      await eliminarHabitacion(id);
      handleObtenerHabitaciones();
      return;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const context: HabitacionesContextValue = {
    habitaciones,
    datosRegistroHabitacion,
    crearTipologia,
    eliminarTipologia,
    guardarTipologia,
  };
  return context;
};

export { useHabitacionesTab };
