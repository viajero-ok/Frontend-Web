import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Check,
  handleSelectCheckItem,
} from "../../../../components/ui/Check/Check";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/Form/Field";
import { Input } from "../../../../components/ui/Input/Input";
import { Select, SelectOption } from "../../../../components/ui/Select/Select";
import { useToast } from "../../../../components/ui/Toast/Toast";
import { useActividad } from "../../Provider/ActividadProvider";

// const numeric = z.preprocess((val) => {
//   if (typeof val === "string" && /^[0-9]+$/.test(val)) {
//     return Number(val);
//   }
//   return val;
// }, z.number({ message: "Debe ser un número" }));

// const formSchema = z.object({
//   nombre_actividad: z.string({ message: "El campo es requerido" }),
//   descripcion_actividad: z.string({ message: "El campo es requerido" }),
//   id_sub_tipo_oferta: z.number({ message: "El campo es requerido" }),
//   id_sub_categoria: z.number({ message: "El campo es requerido" }),
//   requisitos_actividad: z.string({ message: "El campo es requerido" }),
//   id_dificultad: z.number({ message: "El campo es requerido" }),
//   duracion_actividad: numeric,
//   distancia_actividad: numeric,
//   bl_con_guia: z.boolean({ message: "El campo es requerido" }).optional(),

//   // politicas_reserva
//   id_politica_cancelacion: z.number({ message: "El campo es requerido" }),
//   //plazo_dias_cancelacion: z.any(),
//   id_tipo_pago_anticipado: z.number({ message: "El campo es requerido" }),
//   //porcentaje_pago_anticipado: z.any(), // float
// });

type TActividadForm = {
  idOferta: string;
};
export default function ActividadForm(props: TActividadForm) {
  const [formMetodosDePago, setFormMetodosDePago] = useState<number[]>([]);

  const {
    idOferta,

    actividadSchema,
    actividadForm,
    actualizarActividadTab,
    actividadIsDirty,

    categorias,
    subCategorias,
    politicasDeCancelacion,
    tiposPagoAnticipado,
    metodosDePago,
    dificultades,

    guardarActividad,
    datosRegistradosActividad,
  } = useActividad();
  const form = actividadForm;

  useEffect(() => {
    if (!datosRegistradosActividad) return;
    form.reset({
      nombre_actividad: datosRegistradosActividad.nombre,
      descripcion_actividad: datosRegistradosActividad.descripcion,
      id_sub_tipo_oferta: datosRegistradosActividad.id_sub_tipo_oferta,
      id_sub_categoria: datosRegistradosActividad.id_sub_categoria,
      requisitos_actividad: datosRegistradosActividad.requisitos,
      id_dificultad: datosRegistradosActividad.id_dificultad,
      duracion_actividad: parseFloat(datosRegistradosActividad.duracion_horas),
      distancia_actividad: parseFloat(datosRegistradosActividad.distancia_km),
      bl_con_guia: datosRegistradosActividad.bl_con_guia,

      // politicas_reserva
      id_politica_cancelacion:
        datosRegistradosActividad.id_politica_cancelacion,
      //plazo_dias_cancelacion: z.any(),
      id_tipo_pago_anticipado:
        datosRegistradosActividad.id_tipo_pago_anticipado,
      //porcentaje_pago_anticipado: z.any(), // float
    });

    setFormMetodosDePago(
      datosRegistradosActividad.metodos_pago.map(
        (metodo: any) => metodo.id_metodo_pago
      )
    );
  }, [datosRegistradosActividad]);

  const toastCtx = useToast();
  const toast = toastCtx.toast;
  const setToastOpen = toastCtx.setOpen;

  const handleGuardar = (values: z.infer<typeof actividadSchema>) => {
    toast({
      variant: "success",
      title: "Datos guardados",
    });
    guardarActividad({
      ...values,
      id_oferta: idOferta,
      politicas_reserva: {
        id_politica_cancelacion: values.id_politica_cancelacion,
        plazo_dias_cancelacion: 0,
        porcentaje_pago_anticipado: 0,
        id_tipo_pago_anticipado: values.id_tipo_pago_anticipado,
      },
      metodos_de_pago: formMetodosDePago,
      bl_con_guia: values.bl_con_guia ?? false,
    })
      .then(() => {
        actualizarActividadTab();
      })
      .catch(() => {});
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
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-row gap-2">
              <FormField
                control={form.control}
                name="nombre_actividad"
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
                name="descripcion_actividad"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Descripción" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row gap-2">
              <FormField
                control={form.control}
                name="id_sub_tipo_oferta"
                render={({ field }) => (
                  <FormItem className="break-inside-avoid-column w-full">
                    <FormControl>
                      <Select placeholder="Categoría" {...field}>
                        {categorias.map((categoria: any) => (
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
              <FormField
                control={form.control}
                name="id_sub_categoria"
                render={({ field }) => (
                  <FormItem className="break-inside-avoid-column w-full">
                    <FormControl>
                      <Select placeholder="Sub-Categoría" {...field}>
                        {subCategorias.map((subCategoria: any) => (
                          <SelectOption
                            key={subCategoria.id_sub_categoria}
                            value={subCategoria.id_sub_categoria}
                          >
                            {subCategoria.nombre_sub_categoria}
                          </SelectOption>
                        ))}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="duracion_actividad"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Duración(horas)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="distancia_actividad"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Distancia(Km)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_dificultad"
              render={({ field }) => (
                <FormItem className="break-inside-avoid-column w-full">
                  <FormControl>
                    <Select placeholder="Dificultad" {...field}>
                      {dificultades.map((dificultad: any) => (
                        <SelectOption
                          key={dificultad.id_dificultad}
                          value={dificultad.id_dificultad}
                        >
                          {dificultad.dificultad}
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
            name="requisitos_actividad"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Requisitos y recomendaciones"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Check
            className="h-[42pt] w-full"
            onChange={(value: boolean) => form.setValue("bl_con_guia", value)}
            checked={formWatch.bl_con_guia}
          >
            Con guía
          </Check>
          <div className="p-4 border border-gray-200 bg-gray-50 rounded-md text-2xl text-gray-600 font-bold">
            Políticas de reserva
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-4 border border-gray-200 bg-gray-50 rounded-md text-2xl text-gray-600 font-bold">
              Pago anticipado
            </div>
            <div className="p-4 border border-gray-200 bg-gray-50 rounded-md text-2xl text-gray-600 font-bold">
              Política de cancelación
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="id_tipo_pago_anticipado"
              render={({ field }) => (
                <FormItem className="break-inside-avoid-column w-full">
                  <FormControl>
                    <Select placeholder="Tipo de pago" {...field}>
                      {tiposPagoAnticipado.map((tipoPago: any) => (
                        <SelectOption
                          key={tipoPago.id_tipo_pago_anticipado}
                          value={tipoPago.id_tipo_pago_anticipado}
                        >
                          {tipoPago.tipo_pago_anticipado}
                        </SelectOption>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id_politica_cancelacion"
              render={({ field }) => (
                <FormItem className="break-inside-avoid-column w-full">
                  <FormControl>
                    <Select placeholder="Tipo de política" {...field}>
                      {politicasDeCancelacion.map((politica: any) => (
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
          </div>
          <div className="p-4 border border-gray-200 bg-gray-50 rounded-md text-2xl text-gray-600 font-bold">
            Métodos de pago
          </div>
          <div className="">
            {metodosDePago.map((metodo: any) => (
              <Check
                key={metodo.id_metodo_pago}
                value={metodo.id_metodo_pago}
                checked={formMetodosDePago.includes(metodo.id_metodo_pago)}
                className="h-[42pt] mt-2 break-inside-avoid-column"
                onChange={(value: boolean) =>
                  handleSelectCheckItem(
                    metodo.id_metodo_pago,
                    value,
                    setFormMetodosDePago
                  )
                }
              >
                {metodo.metodo_pago}
              </Check>
            ))}
          </div>
          <div className="flex flex-row w-full justify-between mt-4">
            <button className="viajero-button-ghost px-4 py-2">Volver</button>
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
