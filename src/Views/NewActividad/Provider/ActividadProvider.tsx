import * as React from "react";
import {
  getDatosDeRegistroNuevaActividad,
  guardarGuia,
  modificarGuia as modificarGuiaService,
  eliminarGuia as eliminarGuiaService,
  obtenerDatosRegistradosActividad,
  TBodyGuardarActividad,
  guardarActividad as guardarActividadService,
} from "../../../App/Actividades/Actividad";
import {
    obtenerDatosRegistradosHorariosyEntradas,
  registrarHorario,
  TBodyRegistrarHorario,
} from "../../../App/Actividades/TurnosyHorarios";

type ActividadContextValue = {
  idOferta: string;
  actualizar: () => void;
  isDirty: boolean;
  dirt: () => void;

  /** activiadad */
  guias: any[];
  esConGuia: boolean;
  checkEsConGuia: () => void;
  crearGuia: ({
    nro_resolucion,
    nombre_y_apellido,
  }: {
    nro_resolucion: string;
    nombre_y_apellido: string;
  }) => Promise<void>;
  modificarGuia: ({
    id_guia,
    nro_resolucion,
    nombre_y_apellido,
  }: {
    id_guia: number;
    nro_resolucion: string;
    nombre_y_apellido: string;
  }) => Promise<void>;
  eliminarGuia: (idGuia: number) => Promise<void>;
  categorias: any[];
  subCategorias: any[];
  tiposPagoAnticipado: any[];
  politicasDeCancelacion: any[];
  metodosDePago: any[];
  dificultades: any[];
  guardarActividad: (body: TBodyGuardarActividad) => Promise<void>;
  datosRegistradosActividad: any;

  /** imagenes */

  /** ubicación */

  /** turnos y entradas */
  turnos: any[];
  agregarTurno: (body: TBodyRegistrarHorario) => Promise<any>;
};

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

  const dirt = () => setIsDirty(true);

  /** activiadad */
  const [datosRegistradosActividad, setDatosRegistradosActividad] =
    React.useState<any>();
  const [guias, setGuias] = React.useState<any[]>([]);
  const [esConGuia, setEsConGuia] = React.useState<boolean>(false);
  const [categorias, setCategorias] = React.useState<any[]>([]);
  const [subCategorias, setSubCategorias] = React.useState<any[]>([]);
  const [tiposPagoAnticipado, setTiposPagoAnticipado] = React.useState<any[]>(
    []
  );
  const [politicasDeCancelacion, setPoliticasDeCancelacion] = React.useState<
    any[]
  >([]);
  const [metodosDePago, setMetodosDePago] = React.useState<any[]>([]);
  const [dificultades, setDificultades] = React.useState<any[]>([]);

  /** imagenes */

  /** ubicación */

  /** turnos y entradas */
  const [turnos, setTurnos] = React.useState<any[]>([]);

  const getDatosRegistrados = () => {
    obtenerDatosRegistradosActividad(idOferta)
      .then((response) => {
        setGuias(response.data.datos_actividad.guias);
        const { datos_basicos, metodos_pago } = response.data.datos_actividad;
        setDatosRegistradosActividad({
          ...datos_basicos,
          metodos_pago,
          bl_con_guia: datos_basicos.bl_con_guia == 1 ? true : false,
        });
        setEsConGuia(datos_basicos.bl_con_guia == 1 ? true : false);
      })
      .catch(() => {});

      obtenerDatosRegistradosHorariosyEntradas(idOferta).then((response) => {
        setTurnos(response.data.datos_horarios_entradas.horarios_turnos)
      }).catch(() => {})
  };

  React.useEffect(() => {
    getDatosDeRegistroNuevaActividad()
      .then((response: any) => {
        setCategorias(response.data.tipos_y_subtipos.subtipos);
        setSubCategorias(response.data.sub_categorias_actividades);
        setTiposPagoAnticipado(response.data.tipos_pago_anticipado);
        setPoliticasDeCancelacion(response.data.politicas_cancelacion);
        setMetodosDePago(response.data.metodos_pago);
        setDificultades(response.data.dificultad_actividades);
      })
      .then(() => {
        getDatosRegistrados();
      })
      .catch(() => {});
  }, []);

  /** Handlers */
  const actualizar = () => getDatosRegistrados();

  /** actividades */
  const checkEsConGuia = () => {
    setEsConGuia((prev: boolean) => !prev);
  };

  const crearGuia = async ({
    nro_resolucion,
    nombre_y_apellido,
  }: {
    nro_resolucion: string;
    nombre_y_apellido: string;
  }) => {
    try {
      await guardarGuia({
        id_oferta: idOferta,
        nro_resolucion,
        nombre_y_apellido,
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const modificarGuia = async ({
    id_guia,
    nro_resolucion,
    nombre_y_apellido,
  }: {
    id_guia: number;
    nro_resolucion: string;
    nombre_y_apellido: string;
  }) => {
    try {
      await modificarGuiaService({
        id_oferta: idOferta,
        id_guia: id_guia,
        nro_resolucion,
        nombre_y_apellido,
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const eliminarGuia = async (idGuia: number) => {
    try {
      await eliminarGuiaService({ id_guia: idGuia, id_oferta: idOferta });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const guardarActividad = async (body: TBodyGuardarActividad) => {
    try {
      await guardarActividadService(body);
      setIsDirty(true);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  /** turnos y entradas */
  const agregarTurno = async (body: TBodyRegistrarHorario) => {
    try {
      const response = (await registrarHorario(body)).data;
      return response.id_horario;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const context = {
    idOferta,
    actualizar,
    isDirty,
    dirt,

    /** activiadad */
    guias,
    esConGuia,
    checkEsConGuia,
    crearGuia,
    modificarGuia,
    eliminarGuia,
    categorias,
    subCategorias,
    tiposPagoAnticipado,
    politicasDeCancelacion,
    metodosDePago,
    dificultades,
    guardarActividad,
    datosRegistradosActividad,

    /** guias */

    /** imagenes */

    /** ubicación */

    /** turnos y entradas */
    turnos,
    agregarTurno,
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
