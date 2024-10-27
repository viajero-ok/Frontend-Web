import { IonButton, IonCol, IonGrid, IonRow, useIonRouter, IonSelect, IonSelectOption } from "@ionic/react";
import { useEffect, useState } from "react";
import { guardarImagenDeAlojamiento } from "../../../../App/Alojamientos/NuevoAlojamiento";
import { registrarNuevaActividad, getDatosDeRegistroNuevaActividad, guardarActividad, TBodyGuardarActividad } from "../../../../App/Actividades/NuevaActividad";
import MultimediaUpload from "../../../../components/MultimediaUpload/MultimediaUpload";
import { useForm } from "../../../../hooks/UseForm/FormProvider";
import GuiaForm from "./GuiaForm";
import DatosBasicosActividad from "./DatosBasicosActividad";
import PoliticasActividad from "./PoliticasActividad";

type TActividadForm = {
  idOferta: string;

};
export default function ActividadForm(props: TActividadForm) {
  const [politicasDeCancelacion, setPoliticasDeCancelacion] = useState<any>();
  const [tiposPagoAnticipado, setTiposPagoAnticipado] = useState<any>();
  const [metodosDePago, setMetodosDePago] = useState<any>();
  const [formMetodosDePago, setFormMetodosDePago] = useState<number[]>([]);
  const [datosRegistrados, setDatosRegistrados] = useState<any>();

  const handleGuardar = () => {

    if (!form) return;
    const s = form.schema;

    let body: TBodyGuardarActividad = {
      id_oferta: props.idOferta,
      id_sub_tipo_oferta: 0,
      id_sub_categoria: 0,
      nombre_actividad: s.nombre_actividad,
      descripcion_actividad: s.descripcion_actividad,
      requisitos_actividad: s.requisitos_actividad,
      id_dificultad: parseInt(s.id_dificultad),
      duracion_actividad: parseInt(s.duracion_actividad),
      distancia_actividad: parseInt(s.distancia_actividad),
      bl_con_guia: s.bl_con_guia,
      politicas_reserva: {
        id_politica_cancelacion: s.id_politica_cancelacion,
        plazo_dias_cancelacion: parseInt(s.plazo_dias_cancelacion),
        id_tipo_pago_anticipado: 1,
        porcentaje_pago_anticipado: 0.0, // float
      },
      metodos_de_pago: [],
    };
    guardarActividad(body)
      .then((response) => {
        console.log("response: ", response);
      })
      .catch(() => { });
  };

  const form = useForm();
  const router = useIonRouter();

  const handleImageService = (file: File) => {
    return guardarImagenDeAlojamiento({
      imagen: file,
      id_oferta: props.idOferta,
    });
  };

  useEffect(() => {
    getDatosDeRegistroNuevaActividad()
      .then((response: any) => {
        setTiposPagoAnticipado(response.data.tipos_pago_anticipado);
        setPoliticasDeCancelacion(response.data.politicas_cancelacion);
        setMetodosDePago(response.data.metodos_pago);
      })
      .catch((error: any) => { });
  }, []);

  /* useEffect(() => {
    obtenerDatosRegistradosActividad(props.idOferta).then((response: any) => {
      setDatosRegistrados(response.data.datos);
    });
  }, []); */

  return (
    <IonGrid style={{}}>
      <DatosBasicosActividad />
      <GuiaForm />
      <PoliticasActividad
        tipoPagoAnticipado={tiposPagoAnticipado}
        politicasDeCancelacion={politicasDeCancelacion}
        metodosDePago={metodosDePago}
        formMetodosDePago={formMetodosDePago}
        setFormMetodosDePago={setFormMetodosDePago}
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
          onClick={() => handleGuardar()}
        >
          Guardar
        </IonButton>
      </IonRow>
    </IonGrid>
  );
}
