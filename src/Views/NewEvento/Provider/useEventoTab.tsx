import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  guardarDatosBasicosEvento,
  obtenerCategoriasEventos,
  obtenerDatosRegistradosEvento,
} from "../../../App/Eventos/Eventos";

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
  fecha_inicio: z.string({ message: "El campo es requerido" }),
  fecha_fin: z.string({ message: "El campo es requerido" }),
  hora_inicio: z.string({ message: "El campo es requerido" }),
  hora_fin: z.string({ message: "El campo es requerido" }),
  observaciones: z.string().nullable(),
});

export type EventoTabContextValue = {
  categoriasEvento: TCategoriaEvento[];
  datosBasicos: any;
  listadoRedes: any[];
  eventoSchema: typeof eventoSchema;
  eventoForm: UseFormReturn<z.infer<typeof eventoSchema>>;
  guardarEventoTab: (data: z.infer<typeof eventoSchema>) => Promise<any>;
  actualizarEventoTab: () => void;
  isEventoTabComplete: boolean;
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
  const [datosBasicos, setDatosBasicos] = React.useState<any>();
  const [listadoRedes, setListadoRedes] = React.useState<any[]>([]);
  const [isComplete, setIsComplete] = React.useState<boolean>(false);
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

  const guardarEventoTab = async (data: z.infer<typeof eventoSchema>) => {
    console.log("data: ", data.fecha_inicio);
    console.log(
      "fecha hora inicio: ",
      (([y, m, d], [hh, mm]) => new Date(y, m - 1, d, hh, mm))(
        data.fecha_inicio.split("T")[0].split("-").map(Number),
        data.hora_inicio.split(":").map(Number)
      )
    );
    return await guardarDatosBasicosEvento({
      nombre: data.nombre_evento,
      descripcion: data.descripcion_evento,
      requisitos: data.requisitos_evento,
      id_sub_categoria: data.id_categoria,
      url_venta_entradas: data.enlace_venta_entradas,
      fecha_hora_inicio: (([y, m, d], [hh, mm]) =>
        new Date(y, m - 1, d, hh, mm))(
        data.fecha_inicio.split("T")[0].split("-").map(Number),
        data.hora_inicio.split(":").map(Number)
      ),
      fecha_hora_fin: (([y, m, d], [hh, mm]) => new Date(y, m - 1, d, hh, mm))(
        data.fecha_fin.split("T")[0].split("-").map(Number),
        data.hora_fin.split(":").map(Number)
      ),
      observaciones: data.observaciones ?? "",
      id_oferta: idOferta,
    });
  };

  const validateIsComplete = (datosRegistrados: any): boolean => {
    /** Solo se controla un campo, porque o se registra todo, o no se registra nada */
    if (!datosRegistrados.datos_basicos.nombre) return false;

    if (
      !datosRegistrados.redes_sociales ||
      datosRegistrados.redes_sociales.length == 0
    )
      return false;
      
    return true;
  };

  const actualizarEventoTab = () => {
    obtenerDatosRegistradosEvento(idOferta)
      .then((response) => {
        const datos_basicos = response.data.datos_registrados.datos_basicos;
        eventoForm.reset({
          nombre_evento: datos_basicos.nombre,
          descripcion_evento: datos_basicos.descripcion,
          id_categoria: datos_basicos.id_sub_categoria,
          requisitos_evento: datos_basicos.requisitos,
          enlace_venta_entradas: datos_basicos.url_venta_entradas,
          fecha_inicio: datos_basicos.fec_hora_inicio?.split("T")[0],
          fecha_fin: datos_basicos.fec_hora_fin?.split("T")[0],
          hora_inicio: datos_basicos.fec_hora_inicio
            ?.split("T")[1]
            .split(":")
            .slice(0, 2)
            .join(":"),
          hora_fin: datos_basicos.fec_hora_fin
            ?.split("T")[1]
            .split(":")
            .slice(0, 2)
            .join(":"),
          observaciones:
            response.data.datos_registrados.observaciones?.observacion ?? null,
        });
        setListadoRedes(response.data.datos_registrados.redes_sociales);
        setIsComplete(validateIsComplete(response.data.datos_registrados));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    actualizarEventoTab();
  }, []);

  React.useEffect(() => {
    obtenerCategoriasEventos()
      .then((response) => {
        setCategoriasEvento(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const context: EventoTabContextValue = {
    datosBasicos,
    listadoRedes,
    categoriasEvento,
    eventoSchema,
    eventoForm,
    guardarEventoTab,
    actualizarEventoTab,
    isEventoTabComplete: isComplete,
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
