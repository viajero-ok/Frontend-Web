import { LatLng } from "leaflet";
import * as React from "react";
import {
  eliminarGuia as eliminarGuiaService,
  getDatosDeRegistroNuevaActividad,
  guardarActividad as guardarActividadService,
  guardarGuia,
  modificarGuia as modificarGuiaService,
  obtenerDatosRegistradosActividad,
  obtenerUbicacionEstablecimiento,
  TBodyGuardarActividad,
} from "../../../App/Actividades/Actividad";
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
import { getUbicaciones } from "../../../App/Ubicaciones/Ubicaciones";
import {
  TBodyGuardarUbicacion,
  guardarUbicacion as guardarUbicacionService,
  obtenerDatosRegistradosUbicacion,
} from "../../../App/Actividades/Ubicacion";
import {
  guardarImagenOfertaTuristica,
  TBodyGuardarImagenOfertaTuristica,
} from "../../../App/Ofertas/Ofertas";

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
  guardarImagen: (body: TBodyGuardarImagenOfertaTuristica) => Promise<any>;

  /** ubicación */
  ubicacionesDomicilio: {
    provincias: any[];
    departamentos: any[];
    localidades: any[];
  };
  ubicacionEstablecimiento: LatLng | null;
  guardarUbicacion: (body: TBodyGuardarUbicacion) => Promise<void>;
  datosRegistradosUbicacion: any;

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
  const [ubicacionEstablecimiento, setUbicacionEstablecimiento] =
    React.useState<LatLng | null>(null);
  const [provincias, setProvincias] = React.useState<any[]>([]);
  const [departamentos, setDepartamentos] = React.useState<any[]>([]);
  const [localidades, setLocalidades] = React.useState<any[]>([]);
  const [datosRegistradosUbicacion, setDatosRegistradosUbicacion] =
    React.useState<any>();

  /** turnos y entradas */
  /** turnos */
  const [turnos, setTurnos] = React.useState<any[]>([]);
  /** entradas */
  const [entradas, setEntradas] = React.useState<any[]>([]);

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

    obtenerDatosRegistradosHorariosyEntradas(idOferta)
      .then((response) => {
        setTurnos(response.data.datos_horarios_entradas.horarios_turnos);
        setEntradas(response.data.datos_horarios_entradas.entradas);
      })
      .catch(() => {});

    obtenerUbicacionEstablecimiento(idOferta)
      .then((response: any) => {
        setUbicacionEstablecimiento(
          response.data.datos_ubicacion.sin_establecimiento
            ? null
            : new LatLng(
                parseFloat(response.data.datos_ubicacion.latitud),
                parseFloat(response.data.datos_ubicacion.longitud)
              )
        );
      })
      .catch(() => {});

    obtenerDatosRegistradosUbicacion(idOferta)
      .then((response) => {
        setDatosRegistradosUbicacion(response.data.datos_ubicacion);
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    /** actividades */
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

    /** ubicaciones */
    getUbicaciones().then((response) => {
      setProvincias(response.data.ubicaciones.provincias);
      setDepartamentos(response.data.ubicaciones.departamentos);
      setLocalidades(response.data.ubicaciones.localidades);
    });
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

  /** imagenes */
  const guardarImagen = async (body: TBodyGuardarImagenOfertaTuristica) => {
    try {
      await guardarImagenOfertaTuristica(body);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  /** ubicacion */
  const guardarUbicacion = async (body: TBodyGuardarUbicacion) => {
    try {
      await guardarUbicacionService(body);
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

    /** activiadad */
    categorias,
    subCategorias,
    tiposPagoAnticipado,
    politicasDeCancelacion,
    metodosDePago,
    dificultades,
    guardarActividad,
    datosRegistradosActividad,

    /** guias */
    guias,
    esConGuia,
    checkEsConGuia,
    crearGuia,
    modificarGuia,
    eliminarGuia,

    /** imagenes */
    guardarImagen,

    /** ubicación */
    ubicacionesDomicilio: {
      provincias,
      departamentos,
      localidades,
    },
    ubicacionEstablecimiento,
    guardarUbicacion,
    datosRegistradosUbicacion,

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
