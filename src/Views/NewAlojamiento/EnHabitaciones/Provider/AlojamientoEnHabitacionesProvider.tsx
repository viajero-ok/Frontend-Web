import * as React from "react";
import {
  AlojamientoContextValue,
  useAlojamientoTab,
} from "./useAlojamientoTab";
import { useHabitacionesTab } from "./useHabitacionesTab";
import { ImagenesContextValue, useImagenesTab } from "./useImagenesTab";

type AlojamientoEnHabitacionesContextValue = {
  idOferta: string;
} & AlojamientoContextValue &
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
  const alojamiento = useAlojamientoTab({ idOferta });
  const imagenes = useImagenesTab({ idOferta });
  const habitaciones = useHabitacionesTab({ idOferta });

  const context = {
    idOferta,

    ...alojamiento,
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
