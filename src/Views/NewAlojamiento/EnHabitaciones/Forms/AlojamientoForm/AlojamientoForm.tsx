import { useIonRouter } from "@ionic/react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  getDatosDeRegistroNuevoAlojamiento,
  obtenerDatosRegistradosAlojamiento,
  THorariosCheckInCheckOut
} from "../../../../../App/Alojamientos/NuevoAlojamiento";
import { Check, CheckSection } from "../../../../../components/ui/Check/Check";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../../components/ui/Form/Field";
import { Input } from "../../../../../components/ui/Input/Input";
import {
  Select,
  SelectOption,
} from "../../../../../components/ui/Select/Select";

const formSchema = z.object({
  texto_observacion_canchas_deportes: z.string().optional(),
  texto_observacion_normas: z.string().optional(),
  texto_observacion_politica_garantia: z.string().optional(),

  nombre_alojamiento: z.string({ message: "El campo es requerido." }),
  descripcion_alojamiento: z.string({ message: "El campo es requerido." }),

  caracteristicas: z.array(z.number()),

  id_politica_cancelacion: z.number({ message: "El campo es requerido." }),
  plazo_dias_cancelacion: z.string().optional(),
  solicita_garantia: z.boolean({ message: "El campo es requerido." }),
  monto_garantia: z.number().optional(),
  id_tipo_pago_anticipado: z.number({ message: "El campo es requerido." }),
  porcentaje_pago_anticipado: z.number().optional(),
  minimo_dias_estadia: z.number({ message: "El campo es requerido." }),
});

type TAlojamientoForm = {
  id: string;
};
export default function AlojamientoForm(props: TAlojamientoForm) {
  const [caracteristicas, setCaracteristicas] = useState<any>();
  const [politicasDeCancelacion, setPoliticasDeCancelacion] = useState<any>();
  const [tiposPagoAnticipado, setTiposPagoAnticipado] = useState<any>();
  const [metodosDePago, setMetodosDePago] = useState<any>();

  const [datosRegistrados, setDatosRegistrados] = useState<any>();

  const [formCaracteristicas, setFormCaracteristicas] = useState<number[]>([]);
  const [formMetodosDePago, setFormMetodosDePago] = useState<number[]>([]);
  const [formHorarios, setFormHorarios] = useState<THorariosCheckInCheckOut[]>(
    []
  );
  const router = useIonRouter();
  //const form = useForm();

  const handleGuardar = () => {
    // if (!form) return;
    // const s = form.schema;
    // let body: TBodyGuardarAlojamiento = {
    //   id_oferta: props.id,
    //   caracteristicas: formCaracteristicas,
    //   metodos_de_pago: formMetodosDePago,
    //   observaciones: {
    //     texto_observacion_comodidades_y_servicios_oferta: "",
    //     texto_observacion_canchas_deportes: "",
    //     texto_observacion_normas: "",
    //     texto_observacion_politica_garantia: "",
    //   },
    //   politicas_reserva_y_datos_basicos: {
    //     datos_basicos: {
    //       id_tipo_oferta: 0,
    //       id_sub_tipo_oferta: 0,
    //       id_establecimiento: 0,
    //       nombre_alojamiento: s.nombre_alojamiento,
    //       descripcion_alojamiento: s.descripcion_alojamiento,
    //     },
    //     politicas_reserva: {
    //       id_politica_cancelacion: s.id_politica_cancelacion,
    //       plazo_dias_cancelacion: parseInt(s.plazo_dias_cancelacion),
    //       solicita_garantia: false,
    //       monto_garantia: 0.0, // float
    //       id_tipo_pago_anticipado: 1,
    //       porcentaje_pago_anticipado: parseFloat(s.porcentaje_pago_anticipado), // float
    //       monto_pago_anticipado: 0.0, // float
    //       minimo_dias_estadia: parseInt(s.minimo_dias_estadia),
    //     },
    //   },
    //   check_in_out: formHorarios,
    // };
    // guardarAlojamiento(body)
    //   .then((response) => {
    //     console.log("response: ", response);
    //   })
    //   .catch(() => {});
  };

  useEffect(() => {
    getDatosDeRegistroNuevoAlojamiento()
      .then((response: any) => {
        setCaracteristicas(response.data.caracteristicas);
        setPoliticasDeCancelacion(response.data.politicas_cancelacion);
        setTiposPagoAnticipado(response.data.tipos_pago_anticipado);
        setMetodosDePago(response.data.metodos_pago);
      })
      .catch((error: any) => {});
  }, []);

  useEffect(() => {
    obtenerDatosRegistradosAlojamiento(props.id).then((response: any) => {
      console.log(response.datos);
      setDatosRegistrados(response);
    });
  }, []);

  //   useEffect(() => {
  //     if (!datosRegistrados) return;
  //     console.log("datos registrados: ", datosRegistrados);
  //     if (!form) return;
  //     // Verificar si politicas_reserva está definido antes de acceder a sus propiedades
  //     if (datosRegistrados.datos_basicos) {
  //       form.setValue(
  //         "nombre_alojamiento",
  //         datosRegistrados.datos_basicos.nombre
  //       );
  //       form.setValue(
  //         "descripcion_alojamiento",
  //         datosRegistrados.datos_basicos.descripcion
  //       );
  //       form.setValue(
  //         "id_politica_cancelacion",
  //         datosRegistrados.datos_basicos.id_politica_cancelacion
  //       );
  //       form.setValue(
  //         "plazo_dias_cancelacion",
  //         datosRegistrados.datos_basicos.plazo_dias_cancelacion
  //       );
  //       form.setValue(
  //         "solicita_garantia",
  //         datosRegistrados.datos_basicos.bl_solicita_garantia
  //       );
  //       form.setValue(
  //         "monto_garantia",
  //         datosRegistrados.datos_basicos.monto_garantia
  //       );
  //       form.setValue(
  //         "id_tipo_pago_anticipado",
  //         datosRegistrados.datos_basicos.id_tipo_pago_anticipado
  //       );
  //       form.setValue(
  //         "porcentaje_pago_anticipado",
  //         datosRegistrados.datos_basicos.porcentaje_pago_anticipado
  //       );
  //       form.setValue(
  //         "minimo_dias_estadia",
  //         datosRegistrados.datos_basicos.min_dias_estadia
  //       );
  //       /* form.setValue("monto_pago_anticipado", datosRegistrados.politicas_reserva.monto_pago_anticipado); */
  //     }
  //     if (datosRegistrados.horarios_checkin_checkout) {
  //       setFormHorarios(
  //         datosRegistrados.horarios_checkin_checkout.map((horario: any) => ({
  //           id_horario: horario.id_horario,
  //           check_in: {
  //             hora_check_in: horario.check_in_hora,
  //             minuto_check_in: horario.check_in_minuto,
  //           },
  //           check_out: {
  //             hora_check_out: horario.check_out_hora,
  //             minuto_check_out: horario.check_out_minuto,
  //           },
  //           /* aplica_todos_los_dias: horario.aplica_todos_los_dias, */
  //           dias_semana: {
  //             aplica_lunes: horario.aplica_lunes,
  //             aplica_martes: horario.aplica_martes,
  //             aplica_miercoles: horario.aplica_miercoles,
  //             aplica_jueves: horario.aplica_jueves,
  //             aplica_viernes: horario.aplica_viernes,
  //             aplica_sabado: horario.aplica_sabado,
  //             aplica_domingo: horario.aplica_domingo,
  //           },
  //         }))
  //       );
  //     }
  //     if (datosRegistrados.caracteristicas) {
  //       setFormCaracteristicas(
  //         datosRegistrados.caracteristicas.map(
  //           (caracteristica: any) => caracteristica.id_caracteristica
  //         )
  //       );
  //     }
  //     if (datosRegistrados.metodos_pago) {
  //       setFormMetodosDePago(
  //         datosRegistrados.metodos_pago.map(
  //           (metodo: any) => metodo.id_metodo_pago
  //         )
  //       );
  //     }
  //     if (datosRegistrados.observaciones) {
  //       for (const observacion of datosRegistrados.observaciones) {
  //         if (observacion.id_tipo_observacion == 1) {
  //           form.setValue(
  //             "texto_observacion_comodidades_y_servicios_oferta",
  //             observacion?.observacion || ""
  //           );
  //         }
  //         if (observacion.id_tipo_observacion == 2) {
  //           form.setValue(
  //             "texto_observacion_canchas_deportes",
  //             observacion?.observacion || ""
  //           );
  //         }
  //         if (observacion.id_tipo_observacion == 3) {
  //           form.setValue(
  //             "texto_observacion_politica_garantia",
  //             observacion?.observacion || ""
  //           );
  //         }
  //         if (observacion.id_tipo_observacion == 6) {
  //           form.setValue(
  //             "texto_observacion_normas",
  //             observacion?.observacion || ""
  //           );
  //         }
  //       }
  //     }
  //   }, [datosRegistrados]);

  const form = useForm();

  return (
    <div className="flex flex-col w-full">
      <Form {...form}>
        <form className="flex flex-col mx-8 gap-4">
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="text-3xl text-gray-600 font-bold">
                Datos básicos
              </div>
              <FormField
                control={form.control}
                name="nombre"
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
                name="descripcion"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Descripción" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-3xl text-gray-600 font-bold">
              Comodidades y servicios del establecimiento
            </div>
            <div className="columns-3 gap-2 mt-2">
              <CheckSection
                label="Espacios de uso comun"
                className="h-[42pt] break-inside-avoid-column"
              />
              {caracteristicas &&
                caracteristicas.caracteristicas_espacios_uso_comun?.map(
                  (caracteristica: any) => (
                    <Check className="h-[42pt] mt-2 break-inside-avoid-column">
                      {caracteristica.caracteristica}
                    </Check>
                  )
                )}
              <CheckSection
                label="Servicios"
                className="h-[42pt] mt-2 break-inside-avoid-column"
              />
              {caracteristicas &&
                caracteristicas.caracteristicas_servicios?.map(
                  (caracteristica: any) => (
                    <Check className="h-[42pt] mt-2 break-inside-avoid-column">
                      {caracteristica.caracteristica}
                    </Check>
                  )
                )}
              <CheckSection
                label="Entretenimiento"
                className="h-[42pt] mt-2 break-inside-avoid-column"
              />
              {caracteristicas &&
                caracteristicas.caracteristicas_entretenimiento?.map(
                  (caracteristica: any) => (
                    <Check className="h-[42pt] mt-2 break-inside-avoid-column">
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
            <div className="text-3xl text-gray-600 font-bold">
              Políticas y normas del establecimiento
            </div>
            <div className="columns-3 gap-2 mt-2">
              <CheckSection
                label="Normas"
                className="h-[42pt] break-inside-avoid-column"
              />
              {caracteristicas &&
                caracteristicas.caracteristicas_normas?.map(
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
                      <Select placeholder="Tipo de política">
                        {politicasDeCancelacion &&
                          politicasDeCancelacion.map((politica: any) => (
                            <SelectOption
                              key={politica.id_politica_cancelacion}
                              value={politica.id_politica_cancelacion}
                            >
                              {politica.politica_cancelacion}
                            </SelectOption>
                          ))}
                      </Select>
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
              <FormField
                control={form.control}
                name="solicita_garantia"
                render={({ field }) => (
                  <FormItem className="break-inside-avoid-column">
                    <FormControl>
                      <Check
                        className="h-[42pt] break-inside-avoid-column mt-2"
                        {...field}
                      >
                        Solicita garantía al ingresar
                      </Check>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
          <div>
            <div className="text-3xl text-gray-600 font-bold">Reservas</div>
            <div className="columns-3 gap-2 mt-2">
              <CheckSection
                label="Pago anticipado"
                className="h-[42pt] break-inside-avoid-column"
              />
              <FormField
                control={form.control}
                name="id_tipo_pago"
                render={({ field }) => (
                  <FormItem className="mt-2 break-inside-avoid-column">
                    <FormControl>
                      <Select placeholder="Tipo de pago">
                        {tiposPagoAnticipado &&
                          tiposPagoAnticipado.map((tipo: any) => (
                            <SelectOption
                              key={tipo.id_tipo_pago_anticipado}
                              value={tipo.id_tipo_pago_anticipado}
                            >
                              {tipo.tipo_pago_anticipado}
                            </SelectOption>
                          ))}
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
                name="dias_estadia_minima"
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
              {metodosDePago &&
                metodosDePago.map((metodo: any) => (
                  <Check className="h-[42pt] mt-2 break-inside-avoid-column">
                    {metodo.metodo_pago}
                  </Check>
                ))}
            </div>
          </div>
        </form>
      </Form>
      <div className="flex flex-row p-4 px-8 justify-between">
        <button className="viajero-button-ghost px-4 py-2">Volver</button>
        <button className="viajero-button px-4 py-2">Guardar</button>
      </div>
      {/* <DatosBasicos /> */}
      {/* <ComodidadesServicios
        caracteristicas={caracteristicas}
        formCaracteristicas={formCaracteristicas}
        setFormCaracteristicas={setFormCaracteristicas}
      /> */}
      {/* <PoliticasNormas
        idOferta={props.id}
        caracteristicas={caracteristicas}
        formCaracteristicas={formCaracteristicas}
        setFormCaracteristicas={setFormCaracteristicas}
        politicasDeCancelacion={politicasDeCancelacion}
        horarios={formHorarios}
        setHorarios={setFormHorarios}
      /> */}
      {/* <Reservas
        tipoPagoAnticipado={tiposPagoAnticipado}
        formMetodosDePago={formMetodosDePago}
        metodosDePago={metodosDePago}
        setFormMetodosDePago={setFormMetodosDePago}
      /> */}
      {/* <IonRow
        style={{
          justifyContent: "space-around",
          marginTop: "10pt",
          marginBottom: "10pt",
        }}
      >
        <IonButton
          color="light"
          onClick={() => router && router.push("/my-offers")}
        >
          Volver
        </IonButton>
        <IonButton
          style={{
            "--background": "#F08408",
          }}
          onClick={() => handleGuardar()}
        >
          Guardar
        </IonButton>
      </IonRow> */}
    </div>
  );
}
