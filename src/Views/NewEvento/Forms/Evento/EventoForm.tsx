import { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/Form/Field";
import { Input, TimeInput } from "../../../../components/ui/Input/Input";
import { useModal } from "../../../../components/ui/Modal/Modal";
import { Select, SelectOption } from "../../../../components/ui/Select/Select";
import { useToast } from "../../../../components/ui/Toast/Toast";
import { useEvento } from "../../Provider/EventoProvider";
import { DatePicker } from "../../../../components/ui/DatePicker/DatePicker";

type TActividadForm = {
  idOferta: string;
};
export default function EventoForm(props: TActividadForm) {
  const [formMetodosDePago, setFormMetodosDePago] = useState<number[]>([]);

  const { modal } = useModal();

  const {
    idOferta,

    datosBasicos,
    categoriasEvento,
    eventoSchema,
    eventoForm,

    guardarEventoTab,
    // actividadSchema,
    // actividadForm,
    // actualizarActividadTab,
    // actividadIsDirty,

    // categorias,
    // subCategorias,
    // politicasDeCancelacion,
    // tiposPagoAnticipado,
    // metodosDePago,
    // dificultades,

    // guardarActividad,
    // datosRegistradosActividad,
  } = useEvento();
  const form = eventoForm;

  //   useEffect(() => {
  //     if (!datosRegistradosActividad) return;
  //     form.reset({
  //       nombre_actividad: datosRegistradosActividad.nombre,
  //       descripcion_actividad: datosRegistradosActividad.descripcion,
  //       id_sub_tipo_oferta: datosRegistradosActividad.id_sub_tipo_oferta,
  //       id_sub_categoria: datosRegistradosActividad.id_sub_categoria,
  //       requisitos_actividad: datosRegistradosActividad.requisitos,
  //       id_dificultad: datosRegistradosActividad.id_dificultad,
  //       duracion_actividad: parseFloat(datosRegistradosActividad.duracion_horas),
  //       distancia_actividad: parseFloat(datosRegistradosActividad.distancia_km),
  //       bl_con_guia: datosRegistradosActividad.bl_con_guia,

  //       // politicas_reserva
  //       id_politica_cancelacion:
  //         datosRegistradosActividad.id_politica_cancelacion,
  //       //plazo_dias_cancelacion: z.any(),
  //       id_tipo_pago_anticipado:
  //         datosRegistradosActividad.id_tipo_pago_anticipado,
  //       //porcentaje_pago_anticipado: z.any(), // float
  //     });

  //     setFormMetodosDePago(
  //       datosRegistradosActividad.metodos_pago.map(
  //         (metodo: any) => metodo.id_metodo_pago
  //       )
  //     );
  //   }, [datosRegistradosActividad]);

  const { toast } = useToast();

  const handleGuardar = (values: z.infer<typeof eventoSchema>) => {
    guardarEventoTab(values)
      .then(() => {
        toast({
          variant: "success",
          title: "Los datos han sido guardados exitosamente",
        });
      })
      .catch(() => {
        toast({
          variant: "danger",
          title: "Error al intentar guardar los datos. Intente nuevamente",
        });
      });
    // guardarActividad({
    //   ...values,
    //   id_oferta: idOferta,
    //   politicas_reserva: {
    //     id_politica_cancelacion: values.id_politica_cancelacion,
    //     plazo_dias_cancelacion: 0,
    //     porcentaje_pago_anticipado: 0,
    //     id_tipo_pago_anticipado: values.id_tipo_pago_anticipado,
    //   },
    //   metodos_de_pago: formMetodosDePago,
    //   bl_con_guia: values.bl_con_guia ?? false,
    // })
    //   .then(() => {
    //     actualizarActividadTab();
    //     toast({
    //       variant: "success",
    //       title: "Datos guardados",
    //     });
    //   })
    //   .catch(() => {});
  };

  const formWatch = form.watch();

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleGuardar)}
          className="flex flex-col gap-2"
        >
          <div className="p-4 border border-gray-200 bg-gray-50 rounded-md text-2xl text-gray-600 font-bold">
            Datos básicos
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="nombre_evento"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id_categoria"
                render={({ field }) => (
                  <FormItem className="break-inside-avoid-column w-full">
                    <FormControl>
                      <Select placeholder="Categoría" {...field}>
                        {categoriasEvento.map((categoria: any) => (
                          <SelectOption
                            key={categoria.id_sub_tipo_oferta}
                            value={categoria.id_sub_tipo_oferta}
                          >
                            {categoria.nombre_sub_tipo_oferta}
                          </SelectOption>
                        ))}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="descripcion_evento"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Descripción" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requisitos_evento"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Requisitos y/o recomendaciones"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enlace_venta_entradas"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Enlace al sitio de ventas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-4 gap-2">
              <div className="border border-gray-200 bg-gray-50 text-lg font-bold text-gray-600 p-4 rounded-md">
                Fecha de inicio
              </div>
              <div className="border border-gray-200 bg-gray-50 text-lg font-bold text-gray-600 p-4 rounded-md">
                Fecha de fin
              </div>
              <div className="border border-gray-200 bg-gray-50 text-lg font-bold text-gray-600 p-4 rounded-md">
                Hora de inicio
              </div>
              <div className="border border-gray-200 bg-gray-50 text-lg font-bold text-gray-600 p-4 rounded-md">
                Hora de fin
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <FormField
                control={form.control}
                name="fecha_inicio"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <DatePicker placeholder="Fecha de inicio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fecha_fin"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <DatePicker placeholder="Fecha de fin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hora_inicio"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <TimeInput
                        placeholder="00:00"
                        hora={form.getValues().hora_inicio?.split(":")[0]}
                        minuto={form.getValues().hora_inicio?.split(":")[1]}
                        set={(time: string) =>
                          eventoForm.setValue("hora_inicio", time)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hora_fin"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <TimeInput
                        placeholder="Hora de fin"
                        {...field}
                        hora={eventoForm.getValues().hora_fin?.split(":")[0]}
                        minuto={eventoForm.getValues().hora_fin?.split(":")[1]}
                        set={(time: string) =>
                          eventoForm.setValue("hora_fin", time)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="observaciones"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Observaciones" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row w-full justify-end">
            <button type="submit" className="viajero-button px-4 py-2">
              Guardar
            </button>
          </div>
        </form>
      </Form>
      <div className="mt-4 pb-20" />
      {/* <DatosBasicosActividad
        categoria={categoria}
        subCategorias={subcategoria}
        dificultad={dificultad}
        setFormDatosBasicos={setFormDatosBasicos}
        formDatosBasicos={formDatosBasicos}
      /> */}
      {/* <PoliticasActividad
        tipoPagoAnticipado={tiposPagoAnticipado}
        politicasDeCancelacion={politicasDeCancelacion}
        metodosDePago={metodosDePago}
        formMetodosDePago={formMetodosDePago}
        setFormMetodosDePago={setFormMetodosDePago}
      /> */}
      {/* <IonRow>
        <IonCol style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
          <MultimediaUpload
            service={handleImageService}
            uploaded={datosRegistrados?.imagenes ?? []}
          />
        </IonCol>
      </IonRow> */}
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
          onClick={() => {
            handleGuardar();
          }}
        >
          Guardar
        </IonButton>
      </IonRow> */}
      {/* <IonModal
          isOpen={openConfirm}
          onDidDismiss={() => setOpenConfirm(false)}
          style={{
            "--height": "fit-content",
            "--width": "50%",
          }}
        >
          <div className="wrapper">
            <IonGrid
              style={{ display: "flex", flexDirection: "column", flexGrow: 0, margin: "15pt" }}
            >
              <IonRow style={{ justifyContent: "space-between", alignItems: "center", width: "100%", borderBottom: "2px solid #F08408", paddingLeft: "10pt", paddingRight: "10pt", marginBottom: "10pt" }}>
                <IonCol size="auto" style={{ textAlign: "center", marginLeft: "33%", }}>
                  <IonTitle style={{ fontWeight: "bold", marginBottom: "5pt", }}>¡Cambios guardados!</IonTitle>
                </IonCol>
                <IonCol style={{ display: "flex", justifyContent: "flex-end" }}>
                  <IonButton
                    size="small"
                    fill="clear"
                    onClick={() => setOpenConfirm(false)}
                  >
                    <IonIcon icon={close} style={{ color: "#F08408" }} />
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow style={{ justifyContent: "center", marginBottom: "10pt" }}>
                <IonTitle size="small" style={{ textAlign: "center", fontSize: "12pt" }}>
                  Tus cambios se guardaron correctamente. 
                </IonTitle>
              </IonRow>
              <IonRow
                style={{
                  justifyContent: "right",
                  padding: "8pt",
                  paddingTop: "0",
                }}
              >
                <IonButton
                  style={{ "--background": "#F08408", "--color": "white" }}
                  onClick={() => setOpenConfirm(false)}
                >
                  Aceptar
                </IonButton>
              </IonRow>
            </IonGrid>
          </div>
        </IonModal> */}
    </div>
  );
}
