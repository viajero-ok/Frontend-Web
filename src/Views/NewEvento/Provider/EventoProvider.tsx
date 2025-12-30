import * as React from "react";
import { finalizarRegistroActividad } from "../../../App/Actividades/Actividad";
import { publicarEventoService } from "../../../App/Eventos/Eventos";
import { EventoTabContextValue, useEventoTab } from "./useEventoTab";
import {
  HorarioEntradasTabContextValue,
  useHorarioEntradasTab,
} from "./useHorarioEntradasTab";
import { ImagenesContextValue, useImagenesTab } from "./useImagenesTab";
import {
  RedesSocialesTabContextValue,
  useRedesSocialesTab,
} from "./useRedesSocialesTab";
import { UbicacionContextValue, useUbicacionTab } from "./useUbicacionTab";

type EventoContextValue = {
  /** commons */
  idOferta: string;
  isDirty: boolean;
  dirt: () => void;
  puedeRegistrar: boolean;
  registrar: () => Promise<any>;
  publicar: () => Promise<any>;
} & EventoTabContextValue &
  RedesSocialesTabContextValue &
  UbicacionContextValue &
  ImagenesContextValue &
  HorarioEntradasTabContextValue;

const EventoContext = React.createContext<EventoContextValue>(
  {} as EventoContextValue
);

const EventoProvider = ({
  children,
  idOferta,
}: {
  children: React.ReactNode;
  idOferta: string;
}) => {
  const [isDirty, setIsDirty] = React.useState<boolean>(false);
  const [puedeRegistrar, setPuedeRegistrar] = React.useState<boolean>(false);

  const dirt = () => setIsDirty(true);

  /** Hooks para cada tab del dashboard */
  const evento = useEventoTab({ idOferta });
  const redesSociales = useRedesSocialesTab({ idOferta });
  //   const actividad = useActividadTab({ idOferta });
  //   const guias = useGuiasTab({ idOferta });
  const ubicacion = useUbicacionTab({ idOferta });
  //   const turnosEntradas = useTurnosEntradasTab({ idOferta });
  const imagenes = useImagenesTab({ idOferta });
  const horarioEntradas = useHorarioEntradasTab({ idOferta });

  React.useEffect(() => {
    console.log("--> ", evento.isEventoTabComplete);
    setPuedeRegistrar(
      evento.isEventoTabComplete &&
        ubicacion.ubicacionEsCompleta &&
        imagenes.imagenes.length > 0 &&
        horarioEntradas.entradas.length > 0
    );
  }, [evento, ubicacion, imagenes, horarioEntradas]);

  //   React.useEffect(() => {
  //     setPuedeRegistrar(
  //       actividad.actividadEsCompleta &&
  //         (actividad.esConGuia ? guias.guias.length > 0 : true) &&
  //         imagenes.imagenes.length > 0 &&
  //         ubicacion.ubicacionEsCompleta &&
  //         (turnosEntradas.turnos.length > 0 || turnosEntradas.entradas.length > 0)
  //     );
  //   }, [actividad, guias, imagenes, ubicacion, turnosEntradas]);

  const registrar = async () => {
    try {
      await finalizarRegistroActividad(idOferta);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const publicar = async () => {
    try {
      await publicarEventoService(idOferta);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const context: EventoContextValue = {
    idOferta,
    isDirty,
    dirt,
    puedeRegistrar,
    registrar,
    publicar,

    ...evento,
    ...redesSociales,
    // ...guias,
    ...imagenes,
    ...ubicacion,
    ...horarioEntradas,
    // ...turnosEntradas,
  };
  return (
    <EventoContext.Provider value={context}>{children}</EventoContext.Provider>
  );
};

const useEvento = () => {
  const context = React.useContext(EventoContext);
  if (!context)
    throw new Error(
      "useEvento should be used within <EventoContextProvider></EventoContextProvider>"
    );

  return {
    ...context,
  };
};

export { EventoProvider, useEvento };
