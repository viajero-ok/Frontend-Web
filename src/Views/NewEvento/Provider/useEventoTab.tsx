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
import { obtenerCategoriasEventos } from "../../../App/Eventos/Eventos";

const numeric = z.preprocess((val) => {
  if (typeof val === "string" && /^[0-9]+$/.test(val)) {
    return Number(val);
  }
  return val;
}, z.number({ message: "Debe ser un número" }));

const eventoSchema = z.object({
  nombre_evento: z.string({ message: "El campo es requerido" }),
  id_categoria: z.number({ message: "El campo es requerido" }),
  descripcion_evento: z.string({ message: "El campo es requerido" }),
  requisitos_evento: z.string({ message: "El campo es requerido" }),
  enlace_venta_entradas: z.string({ message: "El campo es requerido" }),
  redes_sociales_evento: z.string({ message: "El campo es requerido" }),
  observaciones: z.string({ message: "El campo es requerido" }),
});

export type EventoTabContextValue = {
  categoriasEvento: TCategoriaEvento[];
  eventoSchema: typeof eventoSchema;
  eventoForm: UseFormReturn<z.infer<typeof eventoSchema>>;
  //   actualizareventoTab: () => void;
  //   categorias: any[];
  //   subCategorias: any[];
  //   tiposPagoAnticipado: any[];
  //   politicasDeCancelacion: any[];
  //   metodosDePago: any[];
  //   dificultades: any[];
  //   guardarActividad: (body: TBodyGuardarActividad) => Promise<void>;
  //   datosRegistradosActividad: any;
  //   checkEsConGuia: () => void;
  //   esConGuia: boolean;
  //   actividadEsCompleta: boolean;
  //   actividadIsDirty: boolean;
};

type TCategoriaEvento = {
  id_sub_tipo_oferta: number;
  nombre_sub_tipo_oferta: string;
};
const useEventoTab = ({ idOferta }: { idOferta: string }) => {
  const [categoriasEvento, setCategoriasEvento] = React.useState<
    TCategoriaEvento[]
  >([]);
  //   const [datosRegistradosActividad, setDatosRegistradosActividad] =
  //     React.useState<any>();
  //   const [guias, setGuias] = React.useState<any[]>([]);
  //   const [esConGuia, setEsConGuia] = React.useState<boolean>(false);
  //   const [categorias, setCategorias] = React.useState<any[]>([]);
  //   const [subCategorias, setSubCategorias] = React.useState<any[]>([]);
  //   const [tiposPagoAnticipado, setTiposPagoAnticipado] = React.useState<any[]>(
  //     []
  //   );
  //   const [politicasDeCancelacion, setPoliticasDeCancelacion] = React.useState<
  //     any[]
  //   >([]);
  //   const [metodosDePago, setMetodosDePago] = React.useState<any[]>([]);
  //   const [dificultades, setDificultades] = React.useState<any[]>([]);
  //   const [esCompleto, setEsCompleto] = React.useState<boolean>(false);

  const eventoForm = useForm<z.infer<typeof eventoSchema>>({
    resolver: zodResolver(eventoSchema),
    mode: "onSubmit",
  });
  const formWatch = eventoForm.watch();

  //   const actualizarActividadTab = () => {
  //     obtenerDatosRegistradosActividad(idOferta)
  //       .then((response) => {
  //         setGuias(response.data.datos_actividad.guias);
  //         const { datos_basicos, metodos_pago } = response.data.datos_actividad;
  //         setDatosRegistradosActividad({
  //           ...datos_basicos,
  //           metodos_pago,
  //           bl_con_guia: datos_basicos.bl_con_guia == 1 ? true : false,
  //         });
  //         setEsConGuia(datos_basicos.bl_con_guia == 1 ? true : false);
  //         /** TODO: Modificar en backend para que traiga las imagenes en otro endpoint */
  //         // setImagenes(
  //         //   response.data.imagenes.map((i: any) => ({
  //         //     getId: () => i.id_imagen,
  //         //     getNombre: () => i.nombre,
  //         //     render: () => renderRemoteImage(`data:image/png;base64,${i.datos}`),
  //         //     isRemote: () => true,
  //         //     getDatos: () => i.datos,
  //         //     getSize: () => i.datos.length,
  //         //   }))
  //         // );
  //       })
  //       .catch(() => {});
  //   };

  React.useEffect(() => {
    obtenerCategoriasEventos()
      .then((response) => {
        setCategoriasEvento(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   React.useEffect(() => {
  //     getDatosDeRegistroNuevaActividad()
  //       .then((response: any) => {
  //         setCategorias(response.data.tipos_y_subtipos.subtipos);
  //         setSubCategorias(response.data.sub_categorias_actividades);
  //         setTiposPagoAnticipado(response.data.tipos_pago_anticipado);
  //         setPoliticasDeCancelacion(response.data.politicas_cancelacion);
  //         setMetodosDePago(response.data.metodos_pago);
  //         setDificultades(response.data.dificultad_actividades);
  //       })
  //       .then(() => {
  //         actualizarActividadTab();
  //       })
  //       .catch(() => {});
  //   }, []);

  //   const checkEsConGuia = () => {
  //     setEsConGuia((prev: boolean) => !prev);
  //   };

  //   React.useEffect(() => {
  //     if (actividadForm.formState.isDirty) {
  //       setEsCompleto(false);
  //       return;
  //     }

  //     setEsCompleto(actividadSchema.safeParse(actividadForm.getValues()).success);
  //   }, [formWatch]);

  //   const guardarActividad = async (body: TBodyGuardarActividad) => {
  //     try {
  //       await guardarActividadService(body);
  //       //setIsDirty(true);
  //     } catch (error) {
  //       throw new Error((error as Error).message);
  //     }
  //   };

  const context: EventoTabContextValue = {
    categoriasEvento,
    eventoSchema,
    eventoForm,
    // actualizarActividadTab,
    // categorias,
    // subCategorias,
    // tiposPagoAnticipado,
    // politicasDeCancelacion,
    // metodosDePago,
    // dificultades,
    // guardarActividad,
    // datosRegistradosActividad,
    // checkEsConGuia,
    // esConGuia,
    // actividadEsCompleta: esCompleto,
    // actividadIsDirty: actividadForm.formState.isDirty,
  };
  return context;
};

export { useEventoTab };
