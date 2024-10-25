import {
  IonGrid,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useState } from "react";
import DefaultLoggedLayout from "../Layouts/DefaultLoggedLayout";
import ActividadForm from "./Forms/ActividadForm";
import { FormProvider } from "../../hooks/UseForm/FormProvider";

type TNewActividadView = {
  idOferta: string;
};
export default function NewActividadView(props: TNewActividadView) {
  const [segment, setSegment] = useState<"actividad-form" | "ubicacion-form">(
    "actividad-form"
  );

  const [metodosDePago, setMetodosDePago] = useState<number[]>([]);

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
    politicas_reserva: { // no soporta anidados
      id_politica_cancelacion: "", // number
      plazo_dias_cancelacion: "", // number
      porcentaje_pago_anticipado: "", // number
    },
  };

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
          </IonSegment>
        </IonRow>
        <IonRow>
          {segment == "actividad-form" && (
            <FormProvider schema={schemaActividadForm}>
              <ActividadForm idOferta={props.idOferta} />
            </FormProvider>
          )}
          {/* {segment == "habitaciones-form" && (
              <FormProvider schema={schemaHabitacionesForm}>
                <HabitacionesForm id={props.idOferta} />
              </FormProvider>
            )} */}
        </IonRow>
      </IonGrid>
    </DefaultLoggedLayout>
  );
}
