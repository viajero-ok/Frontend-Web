import {
  IonCard,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonHeader,
  IonRow,
  IonButton,
  IonModal,
} from "@ionic/react";

import { useState } from "react";

type TOfferTypeSelection = {
  setOfferType: (type: "alojamiento" | "actividad" | "evento") => void;
};

export default function OfferTypeSelection(props: TOfferTypeSelection) {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  
  const handleSelect = () => {
    setOpenConfirm(true);
    /*props.setOfferType("alojamiento");
    setOpenConfirm(true);
    console.log("openConfirm", openConfirm);*/
  };

  return (
    <IonGrid
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IonCol>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "13pt",
          }}
        >
          <h1>Elegí el tipo de oferta que querés registrar</h1>
        </IonRow>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "13pt",
          }}
        >
          <IonCard button onClick={()=>handleSelect()}>
            <IonHeader
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                padding: "13pt",
              }}
            >
              <img
                alt="Silhouette of mountains"
                src="public\3.5. Registro oferta\1-Alojamiento.png"
                width={"300pt"}
                height={"auto"}
                style={{}}
              />
              <IonCardTitle
                style={{
                  fontSize: "16pt",
                  fontWeight: "bold",
                  paddingTop: "13pt",
                }}
              >
                Alojamiento
              </IonCardTitle>
            </IonHeader>
          </IonCard>
          <IonCard
            button onClick={() => {props.setOfferType("actividad"); } }
          >
            <IonHeader
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                padding: "13pt",
              }}
            >
              <img
                alt="Silhouette of mountains"
                src="public\3.5. Registro oferta\2-Actividades.png"
                width={"300pt"}
                height={"auto"}
                style={{}}
              />
              <IonCardTitle
                style={{
                  fontSize: "16pt",
                  fontWeight: "bold",
                  paddingTop: "13pt",
                }}
              >
                Actividades
              </IonCardTitle>
            </IonHeader>
          </IonCard>
          <IonCard button onClick={() => props.setOfferType("evento")}>
            <IonHeader
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                padding: "13pt",
              }}
            >
              <img
                alt="Silhouette of mountains"
                src="public\3.5. Registro oferta\3-Eventos.png"
                width={"300pt"}
                height={"auto"}
                style={{}}
              />
              <IonCardTitle
                style={{
                  fontSize: "16pt",
                  fontWeight: "bold",
                  paddingTop: "13pt",
                }}
              >
                Eventos
              </IonCardTitle>
            </IonHeader>
          </IonCard>
        </IonRow>
        <IonModal
       isOpen={openConfirm}
      onDidDismiss={() => setOpenConfirm(false)}
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
                  onClick={() => setOpenConfirm(false)}
                >
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow style={{ justifyContent: "center", padding: "8pt"}}>
              <h3 style={{color: "black", fontSize: "14pt" }}>Estás por crear un nuevo alojamiento</h3>
            </IonRow>
            <IonRow
              style={{
                justifyContent: "right",
                padding: "8pt",
                paddingTop: "0",
              }}
            >
              <IonButton
               onClick={() => setOpenConfirm(false)}
                style={{ marginRight: "8pt", "--background": "white", "--color": "#F08408" }}
              >
                Cancelar
              </IonButton>
              <IonButton onClick={() => props.setOfferType("alojamiento")}
                style={{ "--background": "#F08408", "--color": "white" }}
              >Aceptar
              </IonButton>
            </IonRow>
          </IonGrid>
        </div>
      </IonModal>
      </IonCol>
    </IonGrid>
    
  );
}
