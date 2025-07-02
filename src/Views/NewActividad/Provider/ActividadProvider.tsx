import * as React from "react";
import {
  actualizarEntrada as actualizarEntradaService,
  actualizarHorario,
  eliminarEntrada as eliminarEntradaService,
  eliminarHorario,
  obtenerDatosRegistradosHorariosyEntradas,
  registrarEntrada,
  registrarHorario,
  TBodyActualizarEntrada,
  TBodyActualizarHorario,
  TBodyRegistrarEntrada,
  TBodyRegistrarHorario,
} from "../../../App/Actividades/TurnosyHorarios";
import {
  eliminarImagenOfertaTuristica,
  guardarImagenOfertaTuristica,
  TBodyGuardarImagenOfertaTuristica,
} from "../../../App/Ofertas/Ofertas";
import { LocalOrRemoteImage } from "../../../components/MultimediaUpload/ImageUploadProvider";
import { ActividadTabContextValue, useActividadTab } from "./useActividadTab";
import { GuiasTabContextValue, useGuiasTab } from "./useGuiasTab";
import { UbicacionContextValue, useUbicacionTab } from "./useUbicacionTab";

type ActividadContextValue = {
  /** commons */
  idOferta: string;
  actualizar: () => void;
  isDirty: boolean;
  dirt: () => void;
  puedeRegistrar: boolean;

  /** imagenes */
  imagenes: LocalOrRemoteImage[];
  setImagenes: React.Dispatch<React.SetStateAction<LocalOrRemoteImage[]>>;

  /** turnos y entradas */
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
} & ActividadTabContextValue &
  GuiasTabContextValue &
  UbicacionContextValue;

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

  /** imagenes */
  const [imagenes, setImagenes] = React.useState<LocalOrRemoteImage[]>([]);

  /** turnos y entradas */
  /** turnos */
  const [turnos, setTurnos] = React.useState<any[]>([]);
  /** entradas */
  const [entradas, setEntradas] = React.useState<any[]>([]);

  const getDatosRegistrados = () => {
    // obtenerDatosRegistradosActividad(idOferta)
    //   .then((response) => {
    //     setGuias(response.data.datos_actividad.guias);
    //     const { datos_basicos, metodos_pago } = response.data.datos_actividad;
    //     setDatosRegistradosActividad({
    //       ...datos_basicos,
    //       metodos_pago,
    //       bl_con_guia: datos_basicos.bl_con_guia == 1 ? true : false,
    //     });
    //     setEsConGuia(datos_basicos.bl_con_guia == 1 ? true : false);
    //     setImagenes(
    //       response.data.imagenes.map((i: any) => ({
    //         getId: () => i.id_imagen,
    //         getNombre: () => i.nombre,
    //         render: () => renderRemoteImage(`data:image/png;base64,${i.datos}`),
    //         isRemote: () => true,
    //         getDatos: () => i.datos,
    //         getSize: () => i.datos.length,
    //       }))
    //     );
    //   })
    //   .catch(() => {});

    obtenerDatosRegistradosHorariosyEntradas(idOferta)
      .then((response) => {
        setTurnos(response.data.datos_horarios_entradas.horarios_turnos);
        setEntradas(response.data.datos_horarios_entradas.entradas);
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    setPuedeRegistrar(actividad.actividadEsCompleta);
  }, [actividad.actividadEsCompleta]);

  /** Handlers */
  const actualizar = () => getDatosRegistrados();

  /** imagenes */
  const guardarImagen = async (body: TBodyGuardarImagenOfertaTuristica) => {
    try {
      return await guardarImagenOfertaTuristica(body);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const eliminarImagen = async (idImagen: number) => {
    try {
      await eliminarImagenOfertaTuristica(idImagen);
      setImagenes((prev: any[]) => [
        ...prev.filter((i: any) => i.id_imagen != idImagen),
      ]);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  /** turnos y entradas */
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

  const context: ActividadContextValue = {
    idOferta,
    actualizar,
    isDirty,
    dirt,
    puedeRegistrar,

    ...actividad,
    ...guias,
    ...ubicacion,

    /** imagenes */
    imagenes,
    setImagenes,

    /** turnos y entradas */
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
