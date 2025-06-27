import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonModal, IonRow, IonTitle, useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { guardarImagenDeAlojamiento } from "../../../../App/Alojamientos/NuevoAlojamiento";
import {
  getDatosDeRegistroNuevaActividad,
  guardarActividad,
  TBodyGuardarActividad,
  obtenerDatosRegistradosActividad
} from "../../../../App/Actividades/Actividad";
import MultimediaUpload from "../../../../components/MultimediaUpload/MultimediaUpload";
import { useForm } from "../../../../hooks/UseForm/FormProvider";
import GuiaForm from "./GuiaForm";
import DatosBasicosActividad from "./DatosBasicosActividad";
import PoliticasActividad from "./PoliticasActividad";
import { close } from "ionicons/icons";


type TActividadForm = {
  idOferta: string;

};
export default function ActividadForm(props: TActividadForm) {
  const form = useForm();
  const router = useIonRouter();
  const [politicasDeCancelacion, setPoliticasDeCancelacion] = useState<any>();
  const [tiposPagoAnticipado, setTiposPagoAnticipado] = useState<any>();
  const [metodosDePago, setMetodosDePago] = useState<any>();
  const [formMetodosDePago, setFormMetodosDePago] = useState<number[]>([]);
  const [datosRegistrados, setDatosRegistrados] = useState<any>();
  const [categoria, setCategoria] = useState<any>();
  const [subcategoria, setSubcategoria] = useState<any>();
  const [dificultad, setDificultad] = useState<number>();
  const [formDatosBasicos, setFormDatosBasicos] = useState<TBodyGuardarActividad[]>([]);
  const [guias, setGuias] = useState<any[]>([]);
  const [esConGuia, setEsConGuia] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const handleGuardar = () => {

    if (!form) return;
    const s = form.schema;
    let body: TBodyGuardarActividad = {
      id_oferta: props.idOferta,
      id_sub_tipo_oferta: s.id_sub_tipo_oferta,
      id_sub_categoria: s.id_sub_categoria,
      nombre_actividad: s.nombre_actividad,
      descripcion_actividad: s.descripcion_actividad,
      requisitos_actividad: s.requisitos_actividad,
      id_dificultad: parseInt(s.id_dificultad),
      duracion_actividad: parseInt(s.duracion_actividad),
      distancia_actividad: parseInt(s.distancia_actividad),
      bl_con_guia: esConGuia,
      politicas_reserva: {
        id_politica_cancelacion: s.id_politica_cancelacion,
        plazo_dias_cancelacion: parseInt(s.plazo_dias_cancelacion),
        id_tipo_pago_anticipado: 1,
        porcentaje_pago_anticipado: 0.0, // float
      },
      metodos_de_pago: [],
    };
    console.log("body: ", body);
    guardarActividad(body)
      .then((response) => {
        setDatosRegistrados(response.data.datos_actividad);
        setOpenConfirm(true);
      })
      .catch(() => { })
      setOpenConfirm(true);
  };

  const handleImageService = (file: File) => {
    return guardarImagenDeAlojamiento({
      imagen: file,
      id_oferta: props.idOferta,
    });
  };

  useEffect(() => {
    getDatosDeRegistroNuevaActividad()
      .then((response: any) => {
        setCategoria(response.data.tipos_y_subtipos.subtipos);
        setSubcategoria(response.data.sub_categorias_actividades);
        setTiposPagoAnticipado(response.data.tipos_pago_anticipado);
        setPoliticasDeCancelacion(response.data.politicas_cancelacion);
        setMetodosDePago(response.data.metodos_pago);
        setDificultad(response.data.dificultad_actividades);
      })
      .catch((error: any) => { });
    obtenerDatosRegistradosActividad(props.idOferta)
      .then((response: any) => {
        setGuias(response.data.datos_actividad.guias);
        /*  console.log("guias: ", response.data.datos_actividad.guias); */
      })
      .catch((error: any) => {
        console.log("error: ", error);
      });
  }, []);


  return (
<<<<<<< Updated upstream
    <IonGrid style={{}}>
      <DatosBasicosActividad
=======
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
>>>>>>> Stashed changes
        categoria={categoria}
        subCategorias={subcategoria}
        dificultad={dificultad}
        setFormDatosBasicos={setFormDatosBasicos}
        formDatosBasicos={formDatosBasicos}
      />
      <PoliticasActividad
        tipoPagoAnticipado={tiposPagoAnticipado}
        politicasDeCancelacion={politicasDeCancelacion}
        metodosDePago={metodosDePago}
        formMetodosDePago={formMetodosDePago}
        setFormMetodosDePago={setFormMetodosDePago}
      />
      <GuiaForm
        idOferta={props.idOferta}
        guias={guias}
        setEsConGuia={setEsConGuia}
      />
      <IonRow>
        <IonCol style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
          <MultimediaUpload
            service={handleImageService}
            uploaded={datosRegistrados?.imagenes ?? []}
          />
        </IonCol>
      </IonRow>
      <IonRow
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
          onClick={() => { handleGuardar() }}
        >
          Guardar
        </IonButton>
      </IonRow>
      <IonModal
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
        </IonModal>
    </IonGrid >
  );
}
