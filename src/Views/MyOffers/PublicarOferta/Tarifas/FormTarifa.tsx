import {
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonRow,
  IonSelect,
} from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import CalendarPicker from "../CalendarPicker";

export default function FormTarifa(props: any) {
  return (
    <IonGrid style={{ padding: "12pt" }}>
      <IonRow>
        <CalendarPicker />
      </IonRow>
      <IonRow>
        <IonSelect label="Tipología"></IonSelect>
      </IonRow>
      <IonRow>
        <IonInput type="number" placeholder="Tarifa por noche" />
      </IonRow>
    </IonGrid>
  );
}
