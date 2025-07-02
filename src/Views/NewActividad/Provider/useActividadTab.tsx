import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  getDatosDeRegistroNuevaActividad,
  guardarActividad as guardarActividadService,
  obtenerDatosRegistradosActividad,
  TBodyGuardarActividad,
} from "../../../App/Actividades/Actividad";

const numeric = z.preprocess((val) => {
  if (typeof val === "string" && /^[0-9]+$/.test(val)) {
    return Number(val);
  }
  return val;
}, z.number({ message: "Debe ser un número" }));

const actividadSchema = z.object({
  nombre_actividad: z.string({ message: "El campo es requerido" }),
  descripcion_actividad: z.string({ message: "El campo es requerido" }),
  id_sub_tipo_oferta: z.number({ message: "El campo es requerido" }),
  id_sub_categoria: z.number({ message: "El campo es requerido" }),
  requisitos_actividad: z.string({ message: "El campo es requerido" }),
  id_dificultad: z.number({ message: "El campo es requerido" }),
  duracion_actividad: numeric,
  distancia_actividad: numeric,
  bl_con_guia: z.boolean({ message: "El campo es requerido" }).optional(),

  // politicas_reserva
  id_politica_cancelacion: z.number({ message: "El campo es requerido" }),
  //plazo_dias_cancelacion: z.any(),
  id_tipo_pago_anticipado: z.number({ message: "El campo es requerido" }),
  //porcentaje_pago_anticipado: z.any(), // float
});

export type ActividadTabContextValue = {
  actividadSchema: typeof actividadSchema;
  actividadForm: UseFormReturn<z.infer<typeof actividadSchema>>;
  actualizarActividadTab: () => void;
  categorias: any[];
  subCategorias: any[];
  tiposPagoAnticipado: any[];
  politicasDeCancelacion: any[];
  metodosDePago: any[];
  dificultades: any[];
  guardarActividad: (body: TBodyGuardarActividad) => Promise<void>;
  datosRegistradosActividad: any;
  checkEsConGuia: () => void;
  esConGuia: boolean;
  actividadEsCompleta: boolean;
  actividadIsDirty: boolean;
};

const useActividadTab = ({ idOferta }: { idOferta: string }) => {
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
  const [esCompleto, setEsCompleto] = React.useState<boolean>(false);

  const actividadForm = useForm<z.infer<typeof actividadSchema>>({
    resolver: zodResolver(actividadSchema),
    mode: "onSubmit",
    defaultValues: {
      bl_con_guia: false,
    },
  });

  const actualizarActividadTab = () => {
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
        /** TODO: Modificar en backend para que traiga las imagenes en otro endpoint */
        // setImagenes(
        //   response.data.imagenes.map((i: any) => ({
        //     getId: () => i.id_imagen,
        //     getNombre: () => i.nombre,
        //     render: () => renderRemoteImage(`data:image/png;base64,${i.datos}`),
        //     isRemote: () => true,
        //     getDatos: () => i.datos,
        //     getSize: () => i.datos.length,
        //   }))
        // );
      })
      .catch(() => {});
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
        actualizarActividadTab();
      })
      .catch(() => {});
  }, []);

  const checkEsConGuia = () => {
    setEsConGuia((prev: boolean) => !prev);
  };

  React.useEffect(() => {
    if (actividadForm.formState.isDirty) {
      setEsCompleto(false);
      return;
    }

    setEsCompleto(actividadSchema.safeParse(actividadForm.getValues()).success);
  }, [actividadForm]);

  const guardarActividad = async (body: TBodyGuardarActividad) => {
    try {
      await guardarActividadService(body);
      //setIsDirty(true);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const context: ActividadTabContextValue = {
    actividadSchema,
    actividadForm,
    actualizarActividadTab,
    categorias,
    subCategorias,
    tiposPagoAnticipado,
    politicasDeCancelacion,
    metodosDePago,
    dificultades,
    guardarActividad,
    datosRegistradosActividad,
    checkEsConGuia,
    esConGuia,
    actividadEsCompleta: esCompleto,
    actividadIsDirty: actividadForm.formState.isDirty,
  };
  return context;
};

export { useActividadTab };
