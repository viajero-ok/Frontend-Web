import {
  IonButton,
  IonGrid,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useState } from "react";
import AlojamientoForm from "./Forms/Alojamiento/AlojamientoForm";
import { FormProvider } from "../../../../hooks/UseForm/FormProvider";

export default function NewAlojamiento(props: any) {
  const [segment, setSegment] = useState<
    "alojamiento-form" | "habitaciones-form" | "tarifas-form"
  >("alojamiento-form");

  const schemaAlojamientoForm = {};
  const schemaHabitacionesForm = {};
  const schemaTraifasForm = {};

  return (
    <IonGrid>
      <IonRow style={{ marginTop: "31pt" }}>
        <IonSegment
          value="default"
          onIonChange={(e: any) => setSegment(e.target.value)}
        >
          <IonSegmentButton
            value="alojamiento-form"
            style={{
              "--indicator-color": "#F08408",
              "--color-hover": "#F08408",
              "--color-checked": "#F08408",
            }}
          >
            <IonLabel>Alojamiento</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            value="habitaciones-form"
            style={{
              "--indicator-color": "#F08408",

              "--color-hover": "#F08408",
              "--color-checked": "#F08408",
            }}
          >
            <IonLabel>Habitaciones</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            value="tarifas-form"
            style={{
              "--indicator-color": "#F08408",
              "--color-hover": "#F08408",
              "--color-checked": "#F08408",
            }}
          >
            <IonLabel>Tarifas</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonRow>
      <IonRow>
        {segment == "alojamiento-form" && (
          <FormProvider schema={schemaAlojamientoForm}>
            <AlojamientoForm />
          </FormProvider>
        )}
      </IonRow>
      <IonRow>
        <IonButton
          color="light"
          onClick={() => props.setAlojamientoType(null)}
          style={{ position: "absolute", float: "left", left: "21pt" }}
        >
          Volver
        </IonButton>
      </IonRow>
    </IonGrid>
  );
}
