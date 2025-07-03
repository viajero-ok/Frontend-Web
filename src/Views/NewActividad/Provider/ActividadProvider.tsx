import * as React from "react";
import {
  eliminarImagenOfertaTuristica,
  guardarImagenOfertaTuristica,
  TBodyGuardarImagenOfertaTuristica,
} from "../../../App/Ofertas/Ofertas";
import { LocalOrRemoteImage } from "../../../components/MultimediaUpload/ImageUploadProvider";
import { ActividadTabContextValue, useActividadTab } from "./useActividadTab";
import { GuiasTabContextValue, useGuiasTab } from "./useGuiasTab";
import {
  TurnosEntradasContextValue,
  useTurnosEntradasTab,
} from "./useTurnosEntradasTab";
import { UbicacionContextValue, useUbicacionTab } from "./useUbicacionTab";
import { ImagenesContextValue, useImagenesTab } from "./useImagenesTab";

type ActividadContextValue = {
  /** commons */
  idOferta: string;
  isDirty: boolean;
  dirt: () => void;
  puedeRegistrar: boolean;
} & ActividadTabContextValue &
  GuiasTabContextValue &
  UbicacionContextValue &
  TurnosEntradasContextValue &
  ImagenesContextValue;

const ActividadContext = React.createContext<ActividadContextValue>(
  {} as ActividadContextValue
);

const ActividadProvider = ({
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
  const actividad = useActividadTab({ idOferta });
  const guias = useGuiasTab({ idOferta });
  const ubicacion = useUbicacionTab({ idOferta });
  const turnosEntradas = useTurnosEntradasTab({ idOferta });
  const imagenes = useImagenesTab({ idOferta });

  React.useEffect(() => {
    setPuedeRegistrar(actividad.actividadEsCompleta);
  }, [actividad.actividadEsCompleta]);

  const context: ActividadContextValue = {
    idOferta,
    isDirty,
    dirt,
    puedeRegistrar,

    ...actividad,
    ...guias,
    ...imagenes,
    ...ubicacion,
    ...turnosEntradas,
  };
  return (
    <ActividadContext.Provider value={context}>
      {children}
    </ActividadContext.Provider>
  );
};

const useActividad = () => {
  const context = React.useContext(ActividadContext);
  if (!context)
    throw new Error(
      "useActividad should be used within <ActividadContextProvider></ActividadContextProvider>"
    );

  return {
    ...context,
  };
};

export { ActividadProvider, useActividad };
