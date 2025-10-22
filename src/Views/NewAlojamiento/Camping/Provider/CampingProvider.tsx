import * as React from "react";
import { CampingContextValue, useCampingTab } from "./useCampingTab";
import { HorarioTabContextValue, useHorariosTab } from "./useHorariosTab";
import { ImagenesContextValue, useImagenesTab } from "./useImagenesTab";

type AlojamientoCampingContextValue = {
  idOferta: string;
} & CampingContextValue &
  HorarioTabContextValue &
  ImagenesContextValue;

const AlojamientoCampingContext =
  React.createContext<AlojamientoCampingContextValue>(
    {} as AlojamientoCampingContextValue
  );

const AlojamientoCampingProvider = ({
  children,
  idOferta,
}: {
  children: React.ReactNode;
  idOferta: string;
}) => {
  //   const [puedeRegistrar, setPuedeRegistrar] = React.useState<boolean>(false);

  const alojamiento = useCampingTab({ idOferta });
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
    <AlojamientoCampingContext.Provider value={context}>
      {children}
    </AlojamientoCampingContext.Provider>
  );
};

const useAlojamientoCamping = () => {
  const context = React.useContext(AlojamientoCampingContext);
  if (!context)
    throw new Error(
      "useAlojamientoCamping should be used within <AlojamientoCampingProvider></AlojamientoCampingProvider>"
    );

  return {
    ...context,
  };
};

export { AlojamientoCampingProvider, useAlojamientoCamping };
