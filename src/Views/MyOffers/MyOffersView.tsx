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
import { addCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { obtenerOfertasPorPrestador } from "../../App/Ofertas/Ofertas";
import EstablecimientoCard from "../../components/EstablecimientoCard/EstablecimientoCard";
import DefaultLoggedLayout from "../Layouts/DefaultLoggedLayout";

export default function MyOffersView() {
  const [ofertas, setOfertas] = useState([]);
  const router = useIonRouter();

  useEffect(() => {
    obtenerOfertasPorPrestador()
      .then((response: any) => {
        setOfertas(response.data.establecimientos);
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
                  Mis Ofertas
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
                    router.push("/my-offers/new-offer");
                  }}
                >
                  <IonIcon icon={addCircle} />
                  &nbsp;NUEVA OFERTA
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
              {ofertas.map((oferta: any) => (
                <IonRow style={{ width: "100%" }}>
                  <EstablecimientoCard // [!] Cambiar por una OfertaCard
                    nombre={oferta.nombre}
                    descripcion={oferta.descripcion}
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
