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
import { useEffect, useState } from "react";
import { getDatosDeRegistroNuevoAlojamiento } from "../../../../../../App/Alojamientos/NuevoAlojamiento";

export default function AlojamientoForm(props: any) {
  const [caracteristicas, setCaracteristicas] = useState<any>();
  const [politicasDeCancelacion, setPoliticasDeCancelacion] = useState<any>();
  const [tiposPagoAnticipado, setTiposPagoAnticipado] = useState<any>();
  const [metodosDePago, setMetodosDePago] = useState<any>();

  useEffect(() => {
    getDatosDeRegistroNuevoAlojamiento()
      .then((response: any) => {
        setCaracteristicas(response.data.caracteristicas);
        setPoliticasDeCancelacion(response.data.politicas_cancelacion);
        setTiposPagoAnticipado(response.data.tipos_pago_anticipado);
        setMetodosDePago(response.data.metodos_pago);
      })
      .catch((error: any) => {});
  }, []);

  return (
    <IonGrid style={{}}>
      <DatosBasicos />
      <ComodidadesServicios caracteristicas={caracteristicas} />
      <PoliticasNormas
        caracteristicas={caracteristicas}
        politicasDeCancelacion={politicasDeCancelacion}
      />
      <Reservas
        tipoPagoAnticipado={tiposPagoAnticipado}
        metodosDePago={metodosDePago}
      />
      <IonRow>
        <IonCol style={{ paddingLeft: "100pt", paddingRight: "100pt" }}>
          <MultimediaUpload />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
