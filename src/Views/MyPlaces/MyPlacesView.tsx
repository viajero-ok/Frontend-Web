import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonRow,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import DefaultLoggedLayout from "../Layouts/DefaultLoggedLayout";
import { obtenerEstablecimientos } from "../../App/Establecimientos/Establecimientos";
import EstablecimientoCard from "../../components/EstablecimientoCard/EstablecimientoCard";
import { addCircle } from "ionicons/icons";

export default function MyPlacesView() {
  const [establecimientos, setEstablecimientos] = useState([]);
  const router = useIonRouter();

  useEffect(() => {
    obtenerEstablecimientos()
      .then((response: any) => {
        setEstablecimientos(response.data.establecimientos);
      })
      .catch(() => {});
  }, []);

  return (
    <DefaultLoggedLayout>
      <IonContent>
        <IonGrid
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            marginTop: "31pt",
          }}
        >
          <IonRow>
            <IonCol>
              <IonRow>
                <IonTitle style={{ fontSize: "20pt", fontWeight: "bolder" }}>
                  Mis establecimientos
                </IonTitle>
              </IonRow>
              <IonRow
                style={{
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <IonButton
                  style={{ marginTop: "13pt", "--background": "#F08408" }}
                  onClick={() => {
                    if (!router) return;
                    router.push("/my-places/new-place");
                  }}
                >
                  <IonIcon icon={addCircle} />
                  &nbsp;NUEVO ESTABLECIMIENTO
                </IonButton>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "13pt",
              margin: "3pt",
              width: "100%",
              flexGrow: 1,
            }}
          >
            <IonCol
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "13pt",
                margin: "31pt",
                flexGrow: 1,
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              {establecimientos.map((establecimiento: any) => (
                <IonRow style={{ width: "100%" }}>
                  <EstablecimientoCard
                    nombre={establecimiento.nombre}
                    descripcion={establecimiento.descripcion}
                  />
                </IonRow>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </DefaultLoggedLayout>
  );
}
