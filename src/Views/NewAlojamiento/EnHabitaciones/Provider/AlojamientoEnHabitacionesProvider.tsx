import * as React from "react";
import {
  AlojamientoContextValue,
  useAlojamientoTab,
} from "./useAlojamientoTab";
import { useHabitacionesTab } from "./useHabitacionesTab";
import { ImagenesContextValue, useImagenesTab } from "./useImagenesTab";
import { finalizarRegistroActividad } from "../../../../App/Actividades/Actividad";
import { HorarioTabContextValue, useHorariosTab } from "./useHorariosTab";

type AlojamientoEnHabitacionesContextValue = {
  idOferta: string;
  puedeRegistrar: boolean;
  registrar: () => Promise<any>;
  isAlojamientoDirty: boolean;
} & AlojamientoContextValue &
  HorarioTabContextValue &
  ImagenesContextValue;

const AlojamientoEnHabitacionesContext =
  React.createContext<AlojamientoEnHabitacionesContextValue>(
    {} as AlojamientoEnHabitacionesContextValue
  );

const AlojamientoEnHabitacionesProvider = ({
  children,
  idOferta,
}: {
  children: React.ReactNode;
  idOferta: string;
}) => {
  const [puedeRegistrar, setPuedeRegistrar] = React.useState<boolean>(false);

  const alojamiento = useAlojamientoTab({ idOferta });
  const horarios = useHorariosTab({ idOferta });
  const imagenes = useImagenesTab({ idOferta });
  const habitaciones = useHabitacionesTab({ idOferta });

  React.useEffect(() => {
    setPuedeRegistrar(alojamiento.alojamientoEsCompleto);
  }, [alojamiento, imagenes, habitaciones]);

  const registrar = async () => {
    try {
      await finalizarRegistroActividad(idOferta);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const context = {
    idOferta,
    puedeRegistrar,
    registrar,

    ...alojamiento,
    ...horarios,
    ...imagenes,
    ...habitaciones,
  };
  return (
    <AlojamientoEnHabitacionesContext.Provider value={context}>
      {children}
    </AlojamientoEnHabitacionesContext.Provider>
  );
};

const useAlojamientoEnHabitaciones = () => {
  const context = React.useContext(AlojamientoEnHabitacionesContext);
  if (!context)
    throw new Error(
      "useAlojamientoEnHabitaciones should be used within <AlojamientoEnHabitacionesProvider></AlojamientoEnHabitacionesProvider>"
    );

  return {
    ...context,
  };
};

export { AlojamientoEnHabitacionesProvider, useAlojamientoEnHabitaciones };
