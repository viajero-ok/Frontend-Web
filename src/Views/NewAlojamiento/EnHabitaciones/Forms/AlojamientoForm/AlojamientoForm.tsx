import { useIonRouter } from "@ionic/react";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { TBodyGuardarAlojamiento } from "../../../../../App/Alojamientos/NuevoAlojamiento";
import { Check, CheckSection } from "../../../../../components/ui/Check/Check";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../../components/ui/Form/Field";
import { Input } from "../../../../../components/ui/Input/Input";
import { useModal } from "../../../../../components/ui/Modal/Modal";
import {
  Select,
  SelectOption,
} from "../../../../../components/ui/Select/Select";
import { useAlojamientoEnHabitaciones } from "../../Provider/AlojamientoEnHabitacionesProvider";
import { THorariosCheckInCheckOutContext } from "../../Provider/useAlojamientoTab";
import HorariosCheckInOut from "../HorariosForm/HorariosCheckInOut";

type TAlojamientoForm = {
  id: string;
};
export default function AlojamientoForm(props: TAlojamientoForm) {
  const router = useIonRouter();

  const { modal, setOpen } = useModal();

  const {
    datosRegistroAlojamiento,
    guardarAlojamiento,
    alojamientoForm,
    alojamientoSchema,
    actualizarAlojamiento,
  } = useAlojamientoEnHabitaciones();
  const form = alojamientoForm;
  const formWatch = form.watch();

  const handleGuardar = (values: z.infer<typeof alojamientoSchema>) => {
    let body: TBodyGuardarAlojamiento = {
      id_oferta: props.id,
      caracteristicas: values.caracteristicas,
      metodos_de_pago: values.metodosDePago,
      observaciones: {
        texto_observacion_comodidades_y_servicios_oferta: "",
        texto_observacion_canchas_deportes:
          values.texto_observacion_canchas_deportes ?? "",
        texto_observacion_normas: values.texto_observacion_normas ?? "",
        texto_observacion_politica_garantia:
          values.texto_observacion_politica_garantia ?? "",
      },
      politicas_reserva_y_datos_basicos: {
        datos_basicos: {
          nombre_alojamiento: values.nombre_alojamiento,
          descripcion_alojamiento: values.descripcion_alojamiento,
          id_sub_categoria_alojamiento: values.id_sub_categoria_alojamiento,
        },
        politicas_reserva: {
          id_politica_cancelacion: values.id_politica_cancelacion,
          plazo_dias_cancelacion: Number(values.plazo_dias_cancelacion),
          solicita_garantia: values.solicita_garantia ?? false,
          monto_garantia: Number(values.monto_garantia), // float
          id_tipo_pago_anticipado: values.id_tipo_pago_anticipado,
          porcentaje_pago_anticipado: 0, // float
          monto_pago_anticipado: 0.0, // float
          minimo_dias_estadia: Number(values.minimo_dias_estadia),
        },
      },
      //check_in_out: horarios,
    };

    guardarAlojamiento(body)
      .then(() => {
        modal({
          variant: "success",
          title: "Cambios guardados",
          description: "Los cambios fueron guardados con éxito.",
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
        actualizarAlojamiento();
      })
      .catch((error) => {
        modal({
          variant: "danger",
          title: "Error.",
          description: error.message,
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button-ghost px-4 py-2"
              >
                Aceptar
              </button>
            </>
          ),
        });
      });
  };

  //keyof z.infer<typeof crearHorarioSchema.shape.dias_semana>
  const handleSelectCheckItem = (
    id: number,
    value: boolean,
    form: UseFormReturn<z.infer<typeof alojamientoSchema>>,
    name: keyof typeof alojamientoSchema.shape
  ) => {
    if (!value) {
      form.setValue(
        name,
        [...form.getValues()[name]]
          .filter((v: number) => v != id)
          .sort((a, b) => a - b),
        { shouldDirty: true }
      );
      return;
    }

    form.setValue(
      name,
      [...form.getValues()[name], id].sort((a, b) => a - b),
      { shouldDirty: true }
    );
  };

  return (
    <div className="flex flex-col w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleGuardar)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="p-4 border border-gray-200 bg-gray-50 rounded-md text-2xl text-gray-600 font-bold">
                Datos básicos
              </div>
              <FormField
                control={form.control}
                name="nombre_alojamiento"
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
                name="descripcion_alojamiento"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Descripción" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id_sub_categoria_alojamiento"
                render={({ field }) => (
                  <FormItem className="break-inside-avoid-column mt-2">
                    <FormControl>
                      <Select placeholder="Tipo de alojamiento" {...field}>
                        <SelectOption key={1} value={1}>
                          Habitaciones
                        </SelectOption>
                        <SelectOption key={2} value={2}>
                          Viviendas
                        </SelectOption>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="p-4 border border-gray-200 bg-gray-50 rounded-md text-2xl text-gray-600 font-bold">
              Comodidades y servicios del establecimiento
            </div>
            <div className="columns-3 gap-2">
              <CheckSection
                label="Espacios de uso comun"
                className="h-[42pt] break-inside-avoid-column"
              />
              {datosRegistroAlojamiento.caracteristicas &&
                datosRegistroAlojamiento.caracteristicas.caracteristicas_espacios_uso_comun?.map(
                  (caracteristica: any) => (
                    <Check
                      className="h-[42pt] mt-2 break-inside-avoid-column"
                      checked={formWatch.caracteristicas?.includes(
                        caracteristica.id_caracteristica
                      )}
                      onChange={(value: boolean) =>
                        handleSelectCheckItem(
                          caracteristica.id_caracteristica,
                          value,
                          form,
                          "caracteristicas"
                        )
                      }
                    >
                      {caracteristica.caracteristica}
                    </Check>
                  )
                )}
              <CheckSection
                label="Servicios"
                className="h-[42pt] mt-2 break-inside-avoid-column"
              />
              {datosRegistroAlojamiento.caracteristicas &&
                datosRegistroAlojamiento.caracteristicas.caracteristicas_servicios?.map(
                  (caracteristica: any) => (
                    <Check
                      className="h-[42pt] mt-2 break-inside-avoid-column"
                      checked={formWatch.caracteristicas?.includes(
                        caracteristica.id_caracteristica
                      )}
                      onChange={(value: boolean) =>
                        handleSelectCheckItem(
                          caracteristica.id_caracteristica,
                          value,
                          form,
                          "caracteristicas"
                        )
                      }
                    >
                      {caracteristica.caracteristica}
                    </Check>
                  )
                )}
              <CheckSection
                label="Entretenimiento"
                className="h-[42pt] mt-2 break-inside-avoid-column"
              />
              {datosRegistroAlojamiento.caracteristicas &&
                datosRegistroAlojamiento.caracteristicas.caracteristicas_entretenimiento?.map(
                  (caracteristica: any) => (
                    <Check
                      className="h-[42pt] mt-2 break-inside-avoid-column"
                      checked={formWatch.caracteristicas?.includes(
                        caracteristica.id_caracteristica
                      )}
                      onChange={(value: boolean) =>
                        handleSelectCheckItem(
                          caracteristica.id_caracteristica,
                          value,
                          form,
                          "caracteristicas"
                        )
                      }
                    >
                      {caracteristica.caracteristica}
                    </Check>
                  )
                )}
            </div>
            {/* <FormField
              control={form.control}
              name="observacion?"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Descripción" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <div>
            <div className="p-4 border border-gray-200 bg-gray-50 rounded-md text-2xl text-gray-600 font-bold">
              Políticas y normas del establecimiento
            </div>
            <div className="columns-3 gap-2 mt-2">
              <CheckSection
                label="Normas"
                className="h-[42pt] break-inside-avoid-column"
              />
              {datosRegistroAlojamiento.caracteristicas &&
                datosRegistroAlojamiento.caracteristicas.caracteristicas_normas?.map(
                  (caracteristica: any) => (
                    <Check className="h-[42pt] mt-2 break-inside-avoid-column">
                      {caracteristica.caracteristica}
                    </Check>
                  )
                )}
              <CheckSection
                label="Política de cancelación"
                className="h-[42pt] break-inside-avoid-column mt-2"
              />
              <FormField
                control={form.control}
                name="id_politica_cancelacion"
                render={({ field }) => (
                  <FormItem className="break-inside-avoid-column mt-2">
                    <FormControl>
                      <Select placeholder="Tipo de política" {...field}>
                        {datosRegistroAlojamiento.politicasDeCancelacion &&
                          datosRegistroAlojamiento.politicasDeCancelacion.map(
                            (politica: any) => (
                              <SelectOption
                                key={politica.id_politica_cancelacion}
                                value={politica.id_politica_cancelacion}
                              >
                                {politica.politica_cancelacion}
                              </SelectOption>
                            )
                          )}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="plazo_dias_cancelacion"
                render={({ field }) => (
                  <FormItem className="mt-2 h-[42pt] break-inside-avoid-column">
                    <FormControl>
                      <Input
                        placeholder="Plazo de cancelación (días)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Descripción" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              <CheckSection
                label="Política de garantía"
                className="h-[42pt] break-inside-avoid-column mt-2"
              />
              <Check
                checked={form.getValues().solicita_garantia}
                onChange={(value: boolean) => {
                  form.setValue("solicita_garantia", value);
                }}
                className="h-[42pt] break-inside-avoid-column mt-2"
              >
                Solicita garantía al ingresar
              </Check>

              <FormField
                control={form.control}
                name="monto_garantia"
                render={({ field }) => (
                  <FormItem className="break-inside-avoid-column mt-2">
                    <FormControl>
                      <Input placeholder="Monto de la garantía" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* <div className="flex flex-col w-full">
            <FormField
              control={form.control}
              name="horarios"
              render={() => (
                <FormItem>
                  <FormControl>
                    <HorariosCheckInOut form={form} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
          <div>
            <div className="p-4 border border-gray-200 bg-gray-50 rounded-md text-2xl text-gray-600 font-bold">
              Reservas
            </div>
            <div className="columns-3 gap-2 mt-2">
              <CheckSection
                label="Pago anticipado"
                className="h-[42pt] break-inside-avoid-column"
              />
              <FormField
                control={form.control}
                name="id_tipo_pago_anticipado"
                render={({ field }) => (
                  <FormItem className="mt-2 break-inside-avoid-column">
                    <FormControl>
                      <Select placeholder="Tipo de pago" {...field}>
                        {datosRegistroAlojamiento.tiposPagoAnticipado &&
                          datosRegistroAlojamiento.tiposPagoAnticipado.map(
                            (tipo: any) => (
                              <SelectOption
                                key={tipo.id_tipo_pago_anticipado}
                                value={tipo.id_tipo_pago_anticipado}
                              >
                                {tipo.tipo_pago_anticipado}
                              </SelectOption>
                            )
                          )}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CheckSection
                label="Estadía minima"
                className="h-[42pt] mt-2 break-inside-avoid-column"
              />
              {/* <div className="text-sm text-gray-400">
                Indica la mínima cantidad de noche exigidas para reservar
              </div> */}
              <FormField
                control={form.control}
                name="minimo_dias_estadia"
                render={({ field }) => (
                  <FormItem className="mt-2 break-inside-avoid-column">
                    <FormControl>
                      <Input placeholder="Cantidad de noches" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CheckSection
                label="Métodos de pago"
                className="h-[42pt] mt-2 break-inside-avoid-column"
              />
              {datosRegistroAlojamiento.metodosDePago &&
                datosRegistroAlojamiento.metodosDePago.map((metodo: any) => (
                  <Check
                    className="h-[42pt] mt-2 break-inside-avoid-column"
                    checked={formWatch.metodosDePago?.includes(
                      metodo.id_metodo_pago
                    )}
                    onChange={(value: boolean) =>
                      handleSelectCheckItem(
                        metodo.id_metodo_pago,
                        value,
                        form,
                        "metodosDePago"
                      )
                    }
                  >
                    {metodo.metodo_pago}
                  </Check>
                ))}
            </div>
          </div>
          <div className="flex flex-row justify-end pb-12">
            <button type="submit" className="viajero-button px-4 py-2">
              Guardar
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
