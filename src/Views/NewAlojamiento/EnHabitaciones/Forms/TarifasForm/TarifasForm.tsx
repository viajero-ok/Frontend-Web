import { IonButton, IonCol, IonGrid, IonIcon, IonRow, useIonRouter } from "@ionic/react";
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
  const [tipologias, setTipologias] = useState<any[]>([]);
  const [selectedTarifa, setSelectedTarifa] = useState<any | null>(null);
  const router = useIonRouter();
  const handleAgregar = () => {
    // setTarifas((prev: any[]) => [...prev, {}]);
    setSelectedTarifa(null);
  };

  const handleObtenerDatos = () => {
    obtenerDatosRegistradosTarifas(props.id).then((response: any) => {
      setTarifas(response.data.datos);
    });
  };

  useEffect(() => {
    obtenerDatosRegistroTarifas(props.id).then((response: any) => {
      setTiposPension(response.data.tipos_pension);
      setTipologias(response.data.tipos_detalle);
    });

    handleObtenerDatos();
  }, []);

  return (
    <IonGrid>
      <AgregarTarifa
        tarifas={tarifas}
        handleAgregar={handleAgregar}
        setSelectedTarifa={setSelectedTarifa}
      />
      <Tarifa
        selectedTarifa={selectedTarifa}
        tiposPension={tiposPension}
        tipologias={tipologias}
        handleObtenerDatos={handleObtenerDatos}
      />
      <IonRow style={{ justifyContent: "space-around", marginTop: "10pt", marginBottom: "10pt" }}>
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
        >
          Registrar
        </IonButton>

      </IonRow>
    </IonGrid>
  );
}
