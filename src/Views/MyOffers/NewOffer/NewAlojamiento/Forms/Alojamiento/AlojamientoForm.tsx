import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/react";
import Field from "../../../../../../components/Field/Field";
import { useForm } from "../../../../../../hooks/UseForm/FormProvider";
import { add } from "ionicons/icons";
import MultimediaUpload from "../../../../../../components/MultimediaUpload/MultimediaUpload";
import DatosBasicos from "./DatosBasicos";
import ComodidadesServicios from "./ComodidadesServicios";
import PoliticasNormas from "./PoliticasNormas";
import Reservas from "./Reservas";

export default function AlojamientoForm(props: any) {
  return (
    <IonGrid style={{}}>
      <DatosBasicos />
      <ComodidadesServicios />
      <PoliticasNormas />
      <Reservas />
      <IonRow>
        <IonCol style={{ paddingLeft: "100pt", paddingRight: "100pt" }}>
          <MultimediaUpload />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
