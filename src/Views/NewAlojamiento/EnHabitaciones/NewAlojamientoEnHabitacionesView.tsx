import {
  IonButton,
  IonGrid,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useState } from "react";
import { FormProvider } from "../../../hooks/UseForm/FormProvider";
import AlojamientoForm from "./Forms/AlojamientoForm/AlojamientoForm";
import DefaultLoggedLayout from "../../Layouts/DefaultLoggedLayout";
import HabitacionesForm from "./Forms/HabitacionesForm/HabitacionesForm";
import TarifasForm from "./Forms/TarifasForm/TarifasForm";

type TNewAlojamientoEnHabitacionesView = {
  idOferta: string;
};
export default function NewAlojamientoEnHabitacionesView(
  props: TNewAlojamientoEnHabitacionesView
) {
  const [segment, setSegment] = useState<
    "alojamiento-form" | "habitaciones-form" | "tarifas-form"
  >("alojamiento-form");

  const schemaAlojamientoForm = {
    // Observaciones
    texto_observacion_comodidades_y_servicios_oferta: "",
    texto_observacion_canchas_deportes: "",
    texto_observacion_normas: "",
    texto_observacion_politica_garantia: "",

    // Datos basicos: {
    nombre_alojamiento: "",
    descripcion_alojamiento: "",

    // Politicas de reserva
    id_politica_cancelacion: "",
    plazo_dias_cancelacion: "",
    solicita_garantia: "",
    monto_garantia: "", // float
    id_tipo_pago_anticipado: "",
    porcentaje_pago_anticipado: "", // float
    monto_pago_anticipado: "", // float
    minimo_dias_estadia: "",
  };

  const schemaHabitacionesForm = {};
  const schemaTarifasForm = {};

 

  return (
    <DefaultLoggedLayout>
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
              <AlojamientoForm id={props.idOferta} />
            </FormProvider>
          )}
          {segment == "habitaciones-form" && (
            <FormProvider schema={schemaHabitacionesForm}>
              <HabitacionesForm id={props.idOferta} />
            </FormProvider>
          )}
          {segment == "tarifas-form" && (
            <FormProvider schema={schemaTarifasForm}>
              <TarifasForm id={props.idOferta} />
            </FormProvider>
          )}
        </IonRow>
      </IonGrid>
    </DefaultLoggedLayout>
  );
}
