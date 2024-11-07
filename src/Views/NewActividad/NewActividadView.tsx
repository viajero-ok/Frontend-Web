import {
  IonGrid,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useState } from "react";
import DefaultLoggedLayout from "../Layouts/DefaultLoggedLayout";
import ActividadForm from "./Forms/ActividadForm/ActividadForm";
import { FormProvider } from "../../hooks/UseForm/FormProvider";
import UbicacionForm from "./Forms/UbicacionForm/UbicacionForm";
import TurnosyEntradasForm from "./Forms/TurnosyEntradasForm/TurnosyEntradasForm";


type TNewActividadView = {
  idOferta: string;
};
export default function NewActividadView(props: TNewActividadView) {
  
  const [segment, setSegment] = useState<"actividad-form" | "ubicacion-form" | "turnosyentradas-form">(
    "actividad-form"
  );

  const schemaActividadForm = {
    //id_oferta: "",
    id_sub_tipo_oferta: "", // number
    id_sub_categoria: "", // number
    nombre_actividad: "",
    descripcion_actividad: "",
    requisitos_actividad: "",
    id_dificultad: "", //number
    duracion_actividad: "", // number
    distancia_actividad: "", // number
    bl_con_guia: "", // boolean
    politicas_reserva: {
      // no soporta anidados
      id_politica_cancelacion: "", // number
      plazo_dias_cancelacion: "", // number
      porcentaje_pago_anticipado: "", // number
      id_tipo_pago_anticipado: "", // number
      metodos_pago: [], // number[]
    },
  };

  const schemaUbicacionForm = {
    id_oferta: "",
    calle: "",
    sin_numero: false, // boolean
    numero: "",
    localidad: "", // number
    departamento: "", // number
    provincia:"", // number
    latitud: "",
    longitud: "",
    observaciones: "",
  };

  const schemaTurnosyEntradasForm = {
    id_oferta: "",
    entradas: [],
    horarios_turnos: []

  }


  return (
    <DefaultLoggedLayout>
      <IonGrid>
        <IonRow style={{ marginTop: "31pt" }}>
          <IonSegment
            value="default"
            onIonChange={(e: any) => setSegment(e.target.value)}
          >
            <IonSegmentButton
              value="actividad-form"
              style={{
                "--indicator-color": "#F08408",
                "--color-hover": "#F08408",
                "--color-checked": "#F08408",
              }}
            >
              <IonLabel>Actividad</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value="ubicacion-form"
              style={{
                "--indicator-color": "#F08408",

                "--color-hover": "#F08408",
                "--color-checked": "#F08408",
              }}
            >
              <IonLabel>Ubicación</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value="turnosyentradas-form"
              style={{
                "--indicator-color": "#F08408",

                "--color-hover": "#F08408",
                "--color-checked": "#F08408",
              }}
            >
              <IonLabel>Turnos y Entradas</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonRow>
        <IonRow>
          {segment == "actividad-form" && (
            <FormProvider schema={schemaActividadForm}>
              <ActividadForm idOferta={props.idOferta}/>
            </FormProvider>
          )}
          {segment == "ubicacion-form" && (
            <FormProvider schema={schemaUbicacionForm}>
              <UbicacionForm 
              idOferta={props.idOferta} 
              id_establecimiento={props.id_establecimiento} />
            </FormProvider>
          )}
          {segment == "turnosyentradas-form" && (
            <FormProvider schema={schemaTurnosyEntradasForm}>
              <TurnosyEntradasForm idOferta={props.idOferta}/>
            </FormProvider>
          )}
        </IonRow>
      </IonGrid>
    </DefaultLoggedLayout>
  );
}
