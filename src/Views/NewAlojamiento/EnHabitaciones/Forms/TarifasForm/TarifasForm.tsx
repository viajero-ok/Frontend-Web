import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import AgregarTarifa from "./AgregarTarifa";
import Tarifa from "./Tarifa";
import {
  obtenerDatosRegistradosTarifas,
  obtenerDatosRegistroTarifas,
} from "../../../../../App/Alojamientos/Tarifas";
import { add } from "ionicons/icons";

export default function TarifasForm(props: any) {
  const [tarifas, setTarifas] = useState<any[]>([]);
  const [tiposPension, setTiposPension] = useState<any[]>([]);

  const handleAgregar = () => {
    setTarifas((prev: any[]) => [...prev, {}]);
  };

  useEffect(() => {
    obtenerDatosRegistroTarifas().then((response: any) => {
      setTiposPension(response.data.tipos_pension);
    });

    obtenerDatosRegistradosTarifas(props.id).then((response: any) => {});
  }, []);

  return (
    <IonGrid>
      <IonRow
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>Tarifas</h3>
      </IonRow>
      <IonRow
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IonButton
          style={{ "--background": "#F08408" }}
          onClick={() => handleAgregar()}
        >
          <IonIcon icon={add} />
          &nbsp;AGREGAR NUEVA TARIFA
        </IonButton>
      </IonRow>
      <AgregarTarifa tarifas={tarifas} />
      <Tarifa />
    </IonGrid>
  );
}
