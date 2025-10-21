import * as React from "react";
import {
  AlojamientoContextValue,
  useAlojamientoTab,
} from "./useAlojamientoTab";
import { HorarioTabContextValue, useHorariosTab } from "./useHorariosTab";
import { ImagenesContextValue, useImagenesTab } from "./useImagenesTab";

type AlojamientoIndividualContextValue = {
  idOferta: string;
} & AlojamientoContextValue &
  HorarioTabContextValue &
  ImagenesContextValue;

const AlojamientoIndividualContext =
  React.createContext<AlojamientoIndividualContextValue>(
    {} as AlojamientoIndividualContextValue
  );

const AlojamientoIndividualProvider = ({
  children,
  idOferta,
}: {
  children: React.ReactNode;
  idOferta: string;
}) => {
  //   const [puedeRegistrar, setPuedeRegistrar] = React.useState<boolean>(false);

  const alojamiento = useAlojamientoTab({ idOferta });
  const horarios = useHorariosTab({ idOferta });
  const imagenes = useImagenesTab({ idOferta });
  //   const habitaciones = useHabitacionesTab({ idOferta });

  //   React.useEffect(() => {
  //     setPuedeRegistrar(
  //       alojamiento.alojamientoEsCompleto &&
  //         horarios.horariosEsCompleto &&
  //         imagenes.imagenes.length > 0 &&
  //         habitaciones.habitacionesEsCompleta
  //     );
  //   }, [alojamiento, horarios, imagenes, habitaciones]);

  //   const registrar = async () => {
  //     try {
  //       await finalizarRegistroActividad(idOferta);
  //     } catch (error) {
  //       throw new Error((error as Error).message);
  //     }
  //   };

  const context = {
    idOferta,
    // puedeRegistrar,
    // registrar,
    ...alojamiento,
    ...horarios,
    ...imagenes,
    // ...habitaciones,
  };
  return (
    <AlojamientoIndividualContext.Provider value={context}>
      {children}
    </AlojamientoIndividualContext.Provider>
  );
};

const useAlojamientoIndividual = () => {
  const context = React.useContext(AlojamientoIndividualContext);
  if (!context)
    throw new Error(
      "useAlojamientoIndividual should be used within <AlojamientoIndividualProvider></AlojamientoIndividualProvider>"
    );

  return {
    ...context,
  };
};

export { AlojamientoIndividualProvider, useAlojamientoIndividual };
