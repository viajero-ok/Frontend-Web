import { useState } from "react";
import OfferTypeSelection from "./OfferTypeSelection";
import Actividad from "./NewActividad/NewActividad";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonModal,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { registrarNuevaActividad } from "../../../App/Actividades/NuevaActividad";
import Alojamiento from "./NewAlojamiento/NewAlojamiento";

export default function OfferSelection(props: any) {
  const [offerType, setOfferType] = useState<
    null | "alojamiento" | "actividad" | "evento"
  >(null);
  const router = useIonRouter();

  const handleCrearActividad = () => {
    registrarNuevaActividad({
      id_tipo_oferta: 2,
      id_establecimiento: 23,
    })
      .then((response: any) => {
        router.push(`/my-offers/actividad/edit/${response.data.id_oferta}`);
      });
  };

  return (
    <>
      {offerType == null && (
        <OfferTypeSelection
          setOfferType={(type: "alojamiento" | "actividad" | "evento") =>
            setOfferType(type)
          }
        />
      )}
      {offerType == "alojamiento" && (
        <Alojamiento
          setOfferType={(type: null | "alojamiento" | "actividad" | "evento") =>
            setOfferType(type)
          }
        />
      )}
      <IonModal
        isOpen={offerType == "actividad"}
        onDidDismiss={() => setOfferType(null)}
        style={{ "--height": "fit-content" }}
      >
        <div className="wrapper">
          <IonGrid
            style={{ display: "flex", flexDirection: "column", flexGrow: 0 }}
          >
            <IonRow>
              <IonCol></IonCol>
              <IonCol>
                <h4 style={{ fontWeight: "bold" }}>Confirmar creación</h4>
              </IonCol>
              <IonCol style={{ display: "flex", justifyContent: "right" }}>
                <IonButton
                  size="small"
                  fill="clear"
                  onClick={() => setOfferType(null)}
                >
                  <IonIcon icon={close} />
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow style={{ justifyContent: "center", padding: "8pt" }}>
              <h3 style={{ color: "black", fontSize: "14pt" }}>
                Estás por crear una nueva actividad
              </h3>
            </IonRow>
            <IonRow
              style={{
                justifyContent: "right",
                padding: "8pt",
                paddingTop: "0",
              }}
            >
              <IonButton
                onClick={() => setOfferType(null)}
                style={{
                  marginRight: "8pt",
                  "--background": "white",
                  "--color": "#F08408",
                }}
              >
                Cancelar
              </IonButton>
              <IonButton
                style={{ "--background": "#F08408", "--color": "white" }}
                onClick={() => handleCrearActividad()}
              >
                Crear
              </IonButton>
            </IonRow>
          </IonGrid>
        </div>
      </IonModal>
    </>
  );
}
