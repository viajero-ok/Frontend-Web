import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  guardarHabitacion,
  guardarImagenDeHabitacion,
  TBodyGuardarHabitacion,
} from "../../../../../App/Alojamientos/Habitacion";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check } from "../../../../../components/ui/Check/Check";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../../components/ui/Form/Field";
import { Input } from "../../../../../components/ui/Input/Input";
import { useModal } from "../../../../../components/ui/Modal/Modal";
import { useAlojamientoEnHabitaciones } from "../../Provider/AlojamientoEnHabitacionesProvider";

// id_oferta: props.idOferta,
//       id_tipo_detalle: props.habitacionSelected,
//       tipologia: {
//         nombre_tipologia: nombre ?? "",
//         cantidad: cantidad ?? 0,
//       },
//       plazas: plazas,
//       baño: {
//         cantidad_baños: cantidadBaños ?? 0,
//         bl_baño_compartido: esBañoCompartido ?? false,
//         bl_baño_adaptado: esAdaptado ?? false,
//       },
//       caracteristicas: formCaracteristicas,
//       observaciones: {
//         texto_observacion_comodidades_y_servicios_habitacion:
//           "La habitación cuenta con aire acondicionado.",
//       },

const numeric = z
  .preprocess((val) => {
    if (typeof val === "string" && /^[0-9]+$/.test(val)) {
      return Number(val);
    }
    return val;
  }, z.number({ message: "Debe ser un número" }))
  .optional();

const formSchema = z.object({
  nombre_tipologia: z.string().optional(),
  cantidad: numeric,

  cantidad_camas_doble: numeric,
  cantidad_camas_individual: numeric,
  cantidad_camas_sofa: numeric,

  cantidad_baños: numeric,
  bl_baño_compartido: z.boolean().optional(),
  bl_baño_adaptado: z.boolean().optional(),
  // características
  texto_observacion_comodidades_y_servicios_habitacion: z.string().optional(),
});

type THabitacion = {
  habitacion: any;
  habitacionSelected: any;
  setHabitacionSelected: Dispatch<SetStateAction<any>>;
  idOferta: string;
};
export default function Habitacion(props: THabitacion) {
  const [formCaracteristicas, setFormCaracteristicas] = useState<number[]>([]);

  const { datosRegistroHabitacion, eliminarTipologia, guardarTipologia } =
    useAlojamientoEnHabitaciones();
  const { modal, setOpen } = useModal();

  const handleEliminar = () => {
    eliminarTipologia(props.habitacionSelected)
      .then(() => {
        modal({
          variant: "success",
          title: "Tipología eliminada",
          description: "Se eliminó la tipología con éxito.",
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button bg-green-400! hover:bg-green-400/90! px-4 py-2"
              >
                Aceptar
              </button>
            </>
          ),
        });
        props.setHabitacionSelected(null);
      })
      .catch(() => {
        modal({
          variant: "danger",
          title: "Error",
          description:
            "Error desconocido al tratar de eliminar la habitación. Intente nuevamente.",
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button-ghost bg-red-400/5! hover:bg-red-400/25! px-4 py-2"
              >
                Cerrar
              </button>
            </>
          ),
        });
      });
  };

  const handleConfirmarEliminacion = () => {
    modal({
      variant: "danger",
      title: "Eliminar tipología",
      description: "¿Estás seguro? Esta acción es irreversible.",
      actions: (
        <div className="flex flex-row w-full justify-between">
          <button
            onClick={() => setOpen(false)}
            className="viajero-button-ghost px-4 py-2"
          >
            Cancelar
          </button>
          <button
            onClick={() => handleEliminar()}
            className="viajero-button bg-red-400! hover:bg-red-400/90! px-4 py-2"
          >
            Eliminar
          </button>
        </div>
      ),
    });
  };

  const handleGuardar = (values: z.infer<typeof formSchema>) => {
    const body: TBodyGuardarHabitacion = {
      id_oferta: props.idOferta,
      id_tipo_detalle: props.habitacionSelected,
      tipologia: {
        nombre_tipologia: values.nombre_tipologia ?? "",
        cantidad: values.cantidad ?? 0,
      },
      plazas: [
        { id_tipo_cama: 1, cantidad_camas: values.cantidad_camas_doble ?? 0 },
        {
          id_tipo_cama: 2,
          cantidad_camas: values.cantidad_camas_individual ?? 0,
        },
        { id_tipo_cama: 3, cantidad_camas: values.cantidad_camas_sofa ?? 0 },
      ],
      baño: {
        cantidad_baños: values.cantidad_baños ?? 0,
        bl_baño_compartido: values.bl_baño_compartido ?? false,
        bl_baño_adaptado: values.bl_baño_adaptado ?? false,
      },
      caracteristicas: formCaracteristicas,
      observaciones: {
        texto_observacion_comodidades_y_servicios_habitacion:
          "La habitación cuenta con aire acondicionado.",
      },
    };
    guardarTipologia(body)
      .then(() => {
        modal({
          variant: "success",
          title: "Tipología guardada",
          description: "Los datos de la tipología han sido guardados con éxito",
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button bg-green-400! hover:bg-green-400/90! px-4 py-2"
              >
                Aceptar
              </button>
            </>
          ),
        });
      })
      .catch(() => {
        modal({
          variant: "danger",
          title: "Error",
          description:
            "Error desconocido al tratar de guardar la habitación. Intente nuevamente.",
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button-ghost bg-red-400/5! hover:bg-red-400/25! px-4 py-2"
              >
                Cerrar
              </button>
            </>
          ),
        });
      });
  };

  const handleImageService = (file: File) => {
    return guardarImagenDeHabitacion({
      imagen: file,
      id_oferta: props.idOferta,
      id_tipo_detalle: props.habitacionSelected,
    });
  };

  useEffect(() => {
    setFormCaracteristicas(
      props.habitacion.caracteristicas
        ? props.habitacion.caracteristicas.map(
            (caracteristica: any) => caracteristica.id_caracteristica
          )
        : []
    );
    form.reset({
      nombre_tipologia: props.habitacion.tipo_detalle,
      cantidad: props.habitacion.cantidad,
      cantidad_baños: props.habitacion.cantidad_baños,
      bl_baño_adaptado: props.habitacion.bl_baño_adaptado,
      bl_baño_compartido: props.habitacion.bl_baño_compartido,
      cantidad_camas_doble:
        props.habitacion.plazas && props.habitacion.plazas[0]?.cantidad_camas,
      cantidad_camas_individual:
        props.habitacion.plazas && props.habitacion.plazas[1]?.cantidad_camas,
      cantidad_camas_sofa:
        props.habitacion.plazas && props.habitacion.plazas[2]?.cantidad_camas,
      texto_observacion_comodidades_y_servicios_habitacion:
        props.habitacion.texto_observacion_comodiadades_y_servicios_habitacion,
    });
  }, [props.habitacion]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const handleCaracteristicaChange = (id: number, value: boolean) => {
    setFormCaracteristicas((prev: number[]) => {
      const copy = [...prev];
      if (!copy.includes(id) && value) return [...copy, id];
      if (copy.includes(id) && !value)
        return copy.filter((value: number) => value != id);
      return copy;
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full h-[42pt] items-center p-4 text-xl text-gray-600 font-bold border border-gray-200 bg-gray-50 rounded-md">
        Editar tipología
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleGuardar)} className="mt-2">
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="nombre_tipologia"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cantidad"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Cantidad"
                        label="Cantidad:"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="flex flex-row w-full mt-2 h-[42pt] items-center p-4 text-md text-gray-600 font-bold border border-gray-200 bg-gray-50 rounded-md">
                  Plazas
                </div>
                <div className="flex flex-col mt-2 gap-2">
                  <FormField
                    control={form.control}
                    name="cantidad_camas_doble"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Cantidad"
                            label="Cama doble:"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cantidad_camas_individual"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Cantidad"
                            label="Cama individual:"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cantidad_camas_sofa"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Cantidad"
                            label="Sofá-cama:"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-row w-full mt-2 h-[42pt] items-center p-4 text-md text-gray-600 font-bold border border-gray-200 bg-gray-50 rounded-md">
                  Baños
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <FormField
                    control={form.control}
                    name="cantidad_baños"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Cantidad"
                            label="Cantidad:"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bl_baño_compartido"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Check className="h-[42pt]" {...field}>
                            Es baño compartido
                          </Check>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bl_baño_adaptado"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Check className="h-[42pt]" {...field}>
                            Apto personas con movilidad reducida
                          </Check>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full mt-2 h-[42pt] items-center p-4 text-md text-gray-600 font-bold border border-gray-200 bg-gray-50 rounded-md">
              Comodidades y servicios
            </div>
            <div className="grid grid-cols-2 mt-2 gap-2">
              {datosRegistroHabitacion &&
                datosRegistroHabitacion.caracteristicas_habitaciones?.map(
                  (caracteristica: any) => (
                    <Check
                      className="h-[42pt]"
                      onChange={(checked: boolean) =>
                        handleCaracteristicaChange(
                          caracteristica.id_caracteristica,
                          checked
                        )
                      }
                      checked={formCaracteristicas.includes(
                        caracteristica.id_caracteristica
                      )}
                      key={caracteristica.id_caracteristica}
                    >
                      {caracteristica.caracteristica}
                    </Check>
                  )
                )}
            </div>
            {/* <div className="flex flex-row w-full mt-2 h-[42pt] items-center p-4 text-md text-gray-600 font-bold border border-gray-200 bg-gray-50 rounded-md">
              Observaciones
            </div>
            <FormField
              control={form.control}
              name="texto_observacion_comodidades_y_servicios_habitacion"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormControl>
                    <Input placeholder="Observaciones" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div className="flex flex-row mt-2 justify-between">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleConfirmarEliminacion();
                }}
                className="viajero-button px-4 py-2 bg-red-400! hover:bg-red-400/90!"
              >
                Eliminar
              </button>
              <button type="submit" className="viajero-button px-4 py-2">
                Guardar
              </button>
            </div>
          </form>
        </Form>
      </div>
      {/* <IonRow
        style={{
          display: "flex",
          alignContent: "space-around",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "13pt",
        }}
      >
        <IonButton
          style={{ "--background": "white", color: "#F08408" }}
          onClick={() => handleEliminar()}
        >
          <IonIcon icon={trash} /> Eliminar
        </IonButton>
        <IonButton
          style={{ "--background": "#F08408" }}
          onClick={() => handleGuardar()}
        >
          Guardar
        </IonButton>
      </IonRow> */}
    </div>
  );
}
