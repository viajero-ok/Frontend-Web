import { IonButton, IonCol, IonGrid, IonIcon, IonRow, useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import TurnosForm from "./Turnos/TurnosForm";
import EntradasForm from "./Entradas/EntradasForm";
import { obtenerDatosRegistradosHorariosyEntradas } from "../../../../App/Actividades/TurnosyHorarios";
import { add } from "ionicons/icons";

type TTurnosyEntradasForm = {
  idOferta: string;
};

export default function TurnosyEntradasForm(props: TTurnosyEntradasForm) {
  const [horarios, setHorarios] = useState<any[]>([]);
  const [entradas, setEntradas] = useState<any[]>([]);
  const router = useIonRouter();

  
  const handleAgregarEntrada = () => {
        setEntradas((prev: any[]) => [...prev, {}]);
  };

  const handleAgregarHorario = () => {
    setHorarios((prev: any[]) => [...prev, {}]);
  };


  const handleObtenerDatos = () => {
    obtenerDatosRegistradosHorariosyEntradas(props.idOferta).then((response: any) => {
      console.log("llamada");
      setHorarios(response.data.horarios_turnos);
      setEntradas(response.data.entradas);
    });
  };

  useEffect(() => {
    console.log("turnosID",props.idOferta);
    handleObtenerDatos();
    
  }, []);

  return (
    <IonGrid>
      <TurnosForm
        idOferta={props.idOferta}
        handleAgregar={handleAgregarHorario}
      />
      <EntradasForm
        idOferta={props.idOferta }
        handleAgregar={handleAgregarEntrada}
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
          onClick={() => router && router.push("/my-offers")}
        >
          Registrar
        </IonButton>

      </IonRow>
    </IonGrid>
    
  );
}
