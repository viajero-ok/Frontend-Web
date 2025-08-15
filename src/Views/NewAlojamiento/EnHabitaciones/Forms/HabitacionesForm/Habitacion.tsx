import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  eliminarImagenHabitacion,
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
import { Segment } from "../../../../../components/ui/Segment/Segment";
import { clipboardOutline, imagesOutline } from "ionicons/icons";
import {
  ImageUpload,
  LocalOrRemoteImage,
  renderRemoteImage,
  useImageUpload,
} from "../../../../../components/MultimediaUpload/ImageUploadProvider";
import { useToast } from "../../../../../components/ui/Toast/Toast";

type THabitacion = {
  habitacion: any;
  habitacionSelected: any;
  setHabitacionSelected: Dispatch<SetStateAction<any>>;
  idOferta: string;
};
export default function Habitacion(props: THabitacion) {
  const [segment, setSegment] = useState<string>("datos");

  const {
    idOferta,
    datosRegistroHabitacion,
    eliminarTipologia,
    guardarTipologia,
    habitacionSchema,
    habitacionesDirt,
    actualizarHabitaciones,
  } = useAlojamientoEnHabitaciones();
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

  const handleGuardar = (values: z.infer<typeof habitacionSchema>) => {
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
      caracteristicas: values.caracteristicas,
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

  const form = useForm<z.infer<typeof habitacionSchema>>({
    resolver: zodResolver(habitacionSchema),
    mode: "onSubmit",
    defaultValues: {
      caracteristicas: props.habitacion.caracteristicas
        .map((caracteristica: any) => caracteristica.id_caracteristica)
        .sort((a: number, b: number) => a - b),
      nombre_tipologia: props.habitacion.tipo_detalle,
      cantidad: props.habitacion.cantidad.toString(),
      cantidad_baños: props.habitacion.cantidad_baños.toString(),
      bl_baño_adaptado: props.habitacion.bl_baño_adaptado,
      bl_baño_compartido: props.habitacion.bl_baño_compartido,
      cantidad_camas_doble:
        props.habitacion.plazas &&
        props.habitacion.plazas[0]?.cantidad_camas.toString(),
      cantidad_camas_individual:
        props.habitacion.plazas &&
        props.habitacion.plazas[1]?.cantidad_camas.toString(),
      cantidad_camas_sofa:
        props.habitacion.plazas &&
        props.habitacion.plazas[2]?.cantidad_camas.toString(),
      texto_observacion_comodidades_y_servicios_habitacion:
        props.habitacion.texto_observacion_comodiadades_y_servicios_habitacion,
    },
  });
  const formWatch = form.watch();

  const handleSelectCheckItem = (id: number, value: boolean) => {
    if (!value) {
      form.setValue(
        "caracteristicas",
        [...form.getValues().caracteristicas]
          .filter((v: number) => v != id)
          .sort((a, b) => a - b),
        { shouldDirty: true }
      );
      return;
    }

    form.setValue(
      "caracteristicas",
      [...form.getValues().caracteristicas, id].sort((a, b) => a - b),
      { shouldDirty: true }
    );
  };

  useEffect(() => {
    if (!form.formState) return;
    habitacionesDirt(form.formState.isDirty);
  }, [form.formState]);

  const [imagenes, setImagenes] = useState<LocalOrRemoteImage[]>(
    props.habitacion.imagenes.map((i: any) => ({
      getId: () => i.id_imagen,
      getNombre: () => i.nombre,
      render: () => renderRemoteImage(`data:image/png;base64,${i.datos}`),
      isRemote: () => true,
      getDatos: () => i.datos,
      getSize: () => i.datos.length,
    }))
  );

  const { toast } = useToast();

  const handleDelete = async (idImagen: number) => {
    try {
      await eliminarImagenHabitacion(idImagen)
        .then(() => {
          actualizarHabitaciones();
        })
        .catch(() => {
          toast({
            variant: "danger",
            title: "Error al intentar eliminar la imagen. Intente nuevamente",
          });
        });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const service = async (data: {
    imagen: File;
    setProgress: Dispatch<SetStateAction<number>>;
  }) => {
    try {
      const response = await guardarImagenDeHabitacion({
        imagen: data.imagen,
        setProgress: data.setProgress,
        id_oferta: idOferta,
        id_tipo_detalle: props.habitacionSelected,
      });
      actualizarHabitaciones();
      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const imageUpload = useImageUpload({
    imagenes,
    setImagenes,
    service,
    deleteService: handleDelete,
  });

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full h-[42pt] items-center border rounded-md border-gray-200">
        <div className="flex items-center px-4 border-r h-full text-xl text-gray-600 font-bold text-nowrap border-gray-200 bg-gray-50 rounded-l-md">
          Editar tipología
        </div>
        <div className="flex flex-row gap-2 w-full justify-end pr-4">
          <Segment
            label="Datos de la tipología"
            value="datos"
            segment={segment}
            set={setSegment}
            icon={clipboardOutline}
          />
          <Segment
            label="Imágenes"
            value="imagenes"
            segment={segment}
            set={setSegment}
            icon={imagesOutline}
          />
        </div>
      </div>
      {segment == "datos" && (
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
                          handleSelectCheckItem(
                            caracteristica.id_caracteristica,
                            checked
                          )
                        }
                        checked={formWatch.caracteristicas.includes(
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
              <div className="flex flex-row mt-2 justify-between pb-12">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleConfirmarEliminacion();
                  }}
                  className="viajero-button px-4 py-2 bg-red-400! hover:bg-red-400/90!"
                >
                  Eliminar
                </button>
                <button
                  disabled={!form.formState.isDirty}
                  type="submit"
                  className="viajero-button px-4 py-2 disabled:bg-gray-200! disabled:shadow-none!"
                >
                  Guardar
                </button>
              </div>
            </form>
          </Form>
        </div>
      )}
      {segment == "imagenes" && (
        <div className="w-full mt-2">
          <ImageUpload {...imageUpload} className="w-full" />
        </div>
      )}
    </div>
  );
}
